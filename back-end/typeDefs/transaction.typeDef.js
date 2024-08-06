
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
        transaction: Transaction
    }

    type Mutation{
        createTransaction(input: CreateTransactionInput): Transaction!
        updatetransaction(input: UpdateTransactionInput): Transaction!
        deletetransaction(transactionId: ID!): Transaction!
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

`

export default transactionTypeDef