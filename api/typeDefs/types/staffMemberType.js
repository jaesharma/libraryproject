import { gql } from "apollo-server-express";

const staffMemberType = gql`
  enum Gender {
    Man
    Woman
    NON_BINARY
    PREFER_NOT_TO_SAY
  }

  type StaffMember {
    id: ID!
    name: String!
    alias: String!
    email: String!
    gender: Gender!
    library: Library!
    photo: String
  }
`;

module.exports = {
  staffMemberType,
};
