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
        const result = await Book.findOne({ name: args.name });
        return result.map((b) => {
          return { title: b.title };
        });
      }

      if (args.genre) {
        const result = books.filter((b) => b.genres.includes(args.genre));
        return result;
      }
      return Book.find({}).populate("author");
    },
    allAuthors: async () => {
      const result = await Author.find({});
      console.log(result);
      return result;
    },
  },
  Mutation: {
    addBook: (_, args) => {
      if (authors.filter((a) => a.name === args.author).length === 0) {
        const newAuthor = { name: args.author, born: null };
        authors = authors.concat(newAuthor);
      }
      const newBook = {
        title: args.title,
        author: args.author,
        published: args.published,
        genres: args.genres,
      };
      books = books.concat(newBook);
      return { title: newBook.title, author: newBook.author };
    },
    editAuthor: (_, args) => {
      let [editedAuthor] = authors.filter((a) => a.name === args.name);
      if (!editedAuthor) {
        return null;
      }
      editedAuthor = { ...editedAuthor, born: args.setBornTo };
      authors = authors.map((a) => (a.name === args.name ? editedAuthor : a));
      return editedAuthor;
    },
  },
};

module.exports = resolvers;
