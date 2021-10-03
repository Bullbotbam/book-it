const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
	type Auth {
		token: ID!
		user: User
	}

	type User {
		_id: ID
		username: String
		email: String
		bookCount: Int
		savedBooks: [Book]
	}

	type Book {
		bookId: String
		authors: [String]
		description: String
		title: String
		image: String
		link: String
		
	}
	input inputSavedBooks{
		authors: [String]
		description: String
		title: String
		bookId: String
		image: String
		link: String
	}

	type Query {
		me: User
		users: [User]
		user(username: String!): User
	}

	type Mutation {
		loginUser(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		saveBook([Book: author: String, description: String, bookId: String, image: String, title: String, link: String]): User
		removeBook(bookId: String)
	}
`;

// export typeDefs;
module.exports = typeDefs;
