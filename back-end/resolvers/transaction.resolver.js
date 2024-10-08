import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) {
          throw new Error("unauthorized");
        }
        const userId = await context.getUser()._id;
        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (error) {
        console.error('Error while getting transactions:', error )
        throw new Error(error.message)
      }
    },
    transaction: async (_,{transactionId})=>{      
        try {
            const transaction = await Transaction.findById(transactionId)
            return transaction
        } catch (error) {
            console.error('Error while getting transaction:', error )
            throw new Error(error.message)
        }
    },
    categoryStatistics: async (_,__,context) => {
      const userId = context.getUser()._id
      const transacitons = await Transaction.find({ userId })
      const categoryMap = {}

      transacitons.forEach((transaction) => {
        if(!categoryMap[transaction.category]){
          categoryMap[transaction.category] = 0
        }

        categoryMap[transaction.category] += transaction.amount 
      })

      return Object.entries(categoryMap).map(([category,totalAmount])=> ({category, totalAmount}))
    }
  },
  Mutation: {
    createTransaction:async (_,{input},context) => {
        try {
            const newTransaction = new Transaction({
                userId:await context.getUser()?._id,
                ...input,
            })
            await newTransaction.save()
            return newTransaction
        } catch (error) {
            console.error(error)
            throw new Error('Error while creating Transaction:', error)
        }
    },
    updateTransaction:async (_,{input},context) => {
        try {
            const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId,input,{new:true})
            return updatedTransaction
        } catch (error) {
            console.error(error)
            throw new Error('Error while updating Transaction:', error)
        }
    },
    deleteTransaction:async (_,input,context) => {
        try {
            await Transaction.findByIdAndDelete(input.transactionId)
            return {message: 'Transaction deleted sucessfully'}
        } catch (error) {
            console.error(error)
            throw new Error('Error while updating Transaction:', error)
        }
    },
  },
};

export default transactionResolver;
