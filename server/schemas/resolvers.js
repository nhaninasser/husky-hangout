const { AuthenticationError } = require("apollo-server-express");
const { User, Event, Category } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password");
          // .populate("events");
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find()
      .select("-__v -password");
      // .populate("events");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
      .select("-__v -password");
      // .populate("events");
    },
    events: async (parent, args) => {
      // const params = username ? { username } : {};
      return Event.find(args).sort({ createdAt: -1 });
    },
    event: async (parent, { _id }) => {
      return Event.findOne({ _id });
    }
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
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addEvent: async (parent, args, context) => {
      if (context.user) {
        const event = await Event.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { events: event._id } },
          { new: true }
        );

        return event;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
