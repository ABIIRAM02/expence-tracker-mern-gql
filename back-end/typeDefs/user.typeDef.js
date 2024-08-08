const userTypeDef = `#graphql
type User {
    _id:ID!
    username:String!
    name:String!
    password:String!
    gender:String!
    profilePic:String
}

 type Query{
    authUser : User
    user(userId:ID!) : User
 }

 type Mutation{
    signUp(input: SignUpInput!): User
    login(input: LoginInput!): User
    logout: LogoutResponce
 }

 input SignUpInput{
    username : String!
    name : String!
    password : String!
    gender : String!
 }

 input LoginInput{
    name : String!
    password : String!
 }

 type LogoutResponce{
    message : String!
 }
`
export default userTypeDef