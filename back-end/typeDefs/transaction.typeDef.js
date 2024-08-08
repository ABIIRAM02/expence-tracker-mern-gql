
const transactionTypeDef = `#graphql 

    type Transaction{
        _id: ID
        userId: ID!
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        loaction: String
        date: String!
    }

    type Query {
        transactions: [Transaction!]
        transaction(transactionId:ID!): Transaction
    }

    type Mutation{
        createTransaction(input: CreateTransactionInput): Transaction!
        updatetransaction(input: UpdateTransactionInput): Transaction!
        deletetransaction(transactionId: ID!): deletedTransactionResponce
    }

    input CreateTransactionInput{
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        loaction: String
        date: String!
    }
    input UpdateTransactionInput{
        transactionId: ID!
        description: String
        paymentType: String
        category: String
        amount: Float
        loaction: String
        date: String
    }

    type deletedTransactionResponce{
        message: String!
    }

`

export default transactionTypeDef