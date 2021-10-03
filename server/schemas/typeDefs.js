const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		password: String
		savedBooks: [Book]
	}

	type Book {
		_id: ID
		author: [String]
		description: String
		bookId: String
		image: String
		link: String
		title: String
	}

	type Query {
		me: User
		users: [User]
		user(username: String!): User
		books(title: String): [Book]
		book(_id: ID!): Book
	}

	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		addBook(title: String!): Book
	}

	type Auth {
		token: ID!
		user: User
	}
`;

// export typeDefs;
module.exports = typeDefs;
