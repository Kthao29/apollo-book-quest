// Import User model and authentication utilities
const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

// Define resolvers object
const resolvers = {
    Query: {
        // Resolver to retrieve active user based on context
        activeUser: async (parent, args, context) => {
            // Check if user is authenticated in context
            if (context.user) {
                // If authenticated, find user by ID and return
                return User.findOne({ _id: context.user._id });
            }
            // If not authenticated, throw authentication error
            throw AuthenticationError;
        },
    },
    Mutation: {
        // Resolver to create a new user
        createUser: async (parent, { username, email, password }) => {
            // Create new user with provided username, email, and password
            const user = await User.create({ username, email, password });
            // Generate JWT token for the new user
            const token = signToken(user);
            // Return token and user
            return { token, user };
        },
        
        // Resolver to log in an existing user
        login: async (parent, args) => {
            try {
                // Find user by email
                const user = await User.findOne({ email: args.email });
                // If user not found, return error message
                if (!user) {
                    return { message: "Can't find this user" };
                }
                // Check if password is correct
                const correctPw = await user.isCorrectPassword(args.password);
                // If password incorrect, return error message
                if (!correctPw) {
                    return { message: 'Wrong password!' };
                }
                // Generate JWT token for the user
                const token = signToken(user);
                // Return token and user
                return { token, user };
            } catch (err) {
                console.log(err);
                return err;
            }
        },
        // Resolver to save a book to user's saved books
        saveBook: async (parent, { bookId, title, authors, description, image, link }, context) => {
            try {
                // Update user's saved books with new book
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: {
                        savedBooks: {
                            bookId,
                            title,
                            authors,
                            description,
                            image,
                            link
                        }
                    }},
                    { new: true, runValidators: true }
                );
                // Return updated user
                return updatedUser
            } catch (err) {
                console.log(err);
                return err;
            }
        },
        // Resolver to remove a book from user's saved books
        removeBook: async (parent, args, context) => {
            try {
                // Remove book from user's saved books
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                );
                // If user not found, return error message
                if (!updatedUser) {
                    return { message: "Couldn't find user with this id!" };
                }
                // Return updated user
                return updatedUser;
            } catch (err) {
                console.log(err);
                return err;
            }
        }
    }
}

// Export resolvers object
module.exports = resolvers;
