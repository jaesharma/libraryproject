import { gql } from "apollo-server-express";

export const loginResponseType = gql`
  type LoginResponse {
    token: String!
    profile: allusers!
  }
`;
