import { gql } from "apollo-server-express";

export const userRegistrationInput = gql`
  input userRegistrationInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }
`;
