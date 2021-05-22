import { gql } from "apollo-server-express";

const booklistType = gql`
  type Booklist {
    id: ID!
    title: String!
    description: String
    books: [Book!]!
    createdBy: User!
    createdAt: Date!
    updatedAt: Date!
    isPrivate: Boolean!
    last_modified: Date!
    votes: Float!
    voters: [User]!
    views: Float!
    viewers: [User]!
  }
`;

module.exports = {
  booklistType,
};
