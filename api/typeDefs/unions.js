import { gql } from "apollo-server-express";

export const unions = gql`
  union users = User | Library
  union allusers = User | Library | StaffMember
`;
