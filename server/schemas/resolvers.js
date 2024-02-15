const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      
      // Give error
      throw AuthenticationError;
    },
  },


  Mutation: {
    login: async (parent, { email, password }) => {
      // Find the user with the provided email in the database
      const user = await User.findOne({ email });
      // If user does not exist, throw an AuthenticationError
      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);
      // If password is wrong, throw error
      if (!correctPw) {
        throw AuthenticationError;
      }
      // Generate token
      const token = signToken(user);
      return { token, user };
    },

    // Add a third argument to the resolver to access data in our `context`
    addUser: async (parent, args) =>{
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
      
  },
    // Set up mutation so a logged in user can only remove their profile and no one else's
    saveBook: async (parent, { book }, context) => {
      try {
        const changeUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );
        return changeUser;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    // Make it so a logged in user can only remove a skill from their own profile
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { _id: bookId } } },
          { new: true }
        );
      }
      throw new AuthenticationError();
    },
  },
};


module.exports = resolvers;
