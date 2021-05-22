import { gql } from "apollo-server-express";

export const linksType = gql`
  type Links {
    facebook: String
    twitter: String
    instagram: String
    website: String
    github: String
  }
`;
