const typeDefs = /* GraphQL */ `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String
  }
  type Author {
    id: ID!
    name: String!
    bookCount: Int
    born: Int
  }
  type Book {
    id: ID!
    title: String!
    published: Int
    author: Author!
    genres: [String!]!
  }
  type Query {
    me: User!
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
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
    _resetDatabase: Boolean
  }
`;

module.exports = typeDefs;
