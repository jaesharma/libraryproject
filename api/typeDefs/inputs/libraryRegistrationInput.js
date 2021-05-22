import { gql } from "apollo-server-express";

export const libraryRegistrationInput = gql`
  input libraryRegistrationInput {
    name: String!
    username: String!
    email: String!
    password: String!
    # about: String
    # phone: Float
    # country: String
    # address: String
    # lat: String
    # long: String
    # links: linksInput
  }
`;
