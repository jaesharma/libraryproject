import { gql } from "apollo-server-express";

export const addStaffMemberInput = gql`
  input addStaffMemberInput {
    name: String!
    alias: String!
    email: String!
    password: String!
    gender: Gender!
  }
`;
