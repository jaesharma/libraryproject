import { gql } from "apollo-server-express";

export const addStaffResponseType = gql`
  type AddStaffResponse {
    member: StaffMember
  }
`;
