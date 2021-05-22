import { gql } from "apollo-server-express";

export const reviewType = gql`
  type Review {
    id: ID!
    rating: Int!
    title: String
    review: String
    by: User!
    createdAt: Date!
    updatedAt: Date!
  }
`;
