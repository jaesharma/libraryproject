import { gql } from "apollo-server-express";

const bookType = gql`
  type Identity {
    isbn_10: String
    isbn_13: String
    lccn: String
  }

  type Book {
    id: ID!
    title: String!
    genre: [String]!
    cover: String
    audiobook: String
    ebook: String
    createdBy: users!
    authors: [Author]!
    publishers: [String]
    publish_date: Date
    number_of_pages: Float
    ids: Identity!
    reviews: [Review]!
    createdAt: Date!
    updatedAt: Date!
    modification_history: ModificationHistory!
  }
`;

module.exports = {
  bookType,
};
