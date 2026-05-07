const { GraphQLError } = require("graphql");
const Author = require("./models/author");
const Book = require("./models/book");

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const result = await Book.find({ author: root._id });
      return result.length;
    },
  },
  Query: {
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
        const result = books.filter((b) => b.genres.includes(args.genre));
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
      const authorExists = await Author.exists({ name: args.author });
      let author = null;
      if (!authorExists) {
        console.log(!authorExists, args);
        author = new Author({
          name: args.author,
        });
        author.save();
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
      } catch (error) {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: { ...args },
            error,
          },
        });
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
  },
};

module.exports = resolvers;
