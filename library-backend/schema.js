const typeDefs = /* GraphQL */ `
  type Author {
    id: String!
    name: String!
    bookCount: Int
    born: Int
  }
  type Book {
    id: String!
    title: String!
    published: Int
    author: Author!
    genres: [String!]!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

module.exports = typeDefs;
