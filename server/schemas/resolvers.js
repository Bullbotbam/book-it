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
					.populate('savedBooks');

				return userData;
			}
			throw new AuthenticationError('Please log in for more information');
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
		addBook: async (parent, args) => {
			const book = await Book.create(args);
			return book;
		},
	},
};

module.exports = resolvers;
