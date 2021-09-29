const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await user
					.findOne({ _id: context.user._id })
					.select('-__v -password')
					.populate('books');

				return userData;
			}
			throw new AuthenticationError('Please log in for more information');
		},
		// get all books
		books: async (parent, { username }) => {
			const params = username ? { username } : {};
			return Book.find(params).sort({ createdAt: -1 });
		},
		// get a book by id
		book: async (parent, { _id }) => {
			return Book.findOne({ _id });
		},
		// get all users
		users: async () => {
			return User.find().select('-__v -password').populate('books');
		},
		user: async (parent, { username }) => {
			return User.findOne({ username })
				.select('-__v -password')
				.populate('books');
		},
	},
	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('Incorrent credentials');
			}
			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Incorrect credentials');
			}
			const token = signToken(user);
			return { token, user };
		},
		addBook: async (parent, args, context) => {
			if (context.user) {
				const book = await Book.create({
					...args,
					username: context.user.username,
				});
				await User.findByIdAndUpdate(
					{ _id: context.user._id },
					{ $push: { books: book._id } },
					{ new: true }
				);
				return book;
			}
			throw new AuthenticationError('Please log in to see more!');
		},
	},
};

module.exports = resolvers;
