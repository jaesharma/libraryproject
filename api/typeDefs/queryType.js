import { gql } from "apollo-server-express";

const queryType = gql`
  scalar Date

  type Query {
    test: String!
  }
`;

module.exports = {
  queryType,
};
