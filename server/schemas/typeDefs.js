const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    books: [book]
}

type Book {
    _id: ID 
    createdAt: String
    author: String
    title: String
    description: String
    link: String
    image: String

}

type Query {
    me: User 
    users: [User]
    user(username: String!): User 
    books(title: String): [Book]
    book(_id: ID!): Book 
}

type Mutation {
    login(email: String!, password; String!): Auth 
    addUser(username: String!, email: String!, password: String!): Auth 
    addBook(title: String!): Book
}

`;

// export typeDefs;
module.exports = typeDefs;
