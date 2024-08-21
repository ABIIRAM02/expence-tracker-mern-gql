
const transactionTypeDef = `#graphql 

    type Query {
        transactions: [Transaction!]
        transaction(transactionId:ID!): Transaction
    }

    type Transaction{
        _id: ID
        userId: ID!
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String!
        date: String!
    }

    type deletedTransactionResponce{
        message: String!
    }

    type Mutation{
        createTransaction(input: CreateTransactionInput): Transaction!
        updateTransaction(input: UpdateTransactionInput): Transaction!
        deleteTransaction(transactionId: ID!): deletedTransactionResponce
    }

    input CreateTransactionInput{
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String!
        date: String!
    }

    input UpdateTransactionInput{
        transactionId: ID!
        description: String
        paymentType: String
        category: String
        amount: Float
        location: String
        date: String
    }
`

export default transactionTypeDef