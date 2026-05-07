const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const result = await Book.find({ author: root._id });
      return result.length;
    },
  },
  Query: {
    me: async (root, args) => {
      return User.findOne({ username: args.username });
    },
    bookCount: async () => {
      return Book.collection.countDocuments();
    },
    authorCount: async () => {
      return Author.collection.countDocuments();
    },
    allBooks: async (root, args) => {
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        const result = await Book.find({ author: author._id }).populate(
          "author",
        );
        return result;
      }

      if (args.genre) {
        const result = await Book.find({
          genres: { $all: args.genre },
        }).populate("author");
        return result;
      }
      return await Book.find({}).populate("author");
    },
    allAuthors: async () => {
      const result = await Author.find({});
      return result;
    },
  },
  Mutation: {
    addBook: async (_, args) => {
      if (args.author.length < 4) {
        // errorHandler is defined at the bottom of this file
        errorHandler(
          `Author's name too short, must be longer than 4 characters`,
          args,
          null,
        );
      }

      if (args.title.length < 5) {
        errorHandler(
          `Book's title too short, must be longer than 5 characters`,
          args,
          null,
        );
      }

      const authorExists = await Author.exists({ name: args.author });
      let author = null;
      if (!authorExists) {
        author = new Author({
          name: args.author,
        });
        try {
          await author.save();
        } catch (error) {
          errorHandler(`Saving author failed: ${error.message}`, args, null);
        }
      } else {
        author = Author.findOne({ name: args.author });
      }

      const newBook = new Book({
        title: args.title,
        author: author,
        published: args.published,
        genres: args.genres,
      });

      try {
        await Book.save();
      } catch (error) {
        errorHandler(`Saving book failed: ${error.message}`, args, null);
      }

      return newBook;
    },
    editAuthor: async (_, args) => {
      let authorExists = Author.findOne({ name: args.name });
      if (!authorExists) {
        return null;
      }

      return await Author.findOneAndUpdate(
        { name: args.name },
        { $set: { born: args.setBornTo } },
        { returnDocument: "after" },
      );
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      return user.save().catch((error) => {
        errorHandler(`Creating the user failed: ${args.username}`, args, error);
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        errorHandler("Wrong credentials");
      }

      const userFotToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userFotToken, process.env.JWT_SECRET) };
    },
  },
};

module.exports = resolvers;

const errorHandler = (message, inputs, error) => {
  throw new GraphQLError(message, {
    extensions: {
      code: "BAD_USER_INPUT",
      invalidArgs: { ...inputs },
      error,
    },
  });
};
