import { gql } from "apollo-server-express";

const authorType = gql`
  type Author {
    id: ID!
    name: String!
    alternate_names: [String]
    age: Int
    books: [Book]
    dob: Date
    dod: Date
    createdBy: users!
    createdAt: Date!
    updatedAt: Date!
    modification_history: ModificationHistory!
  }
`;

module.exports = {
  authorType,
};
