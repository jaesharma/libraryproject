import { gql } from "apollo-server-express";

export const userType = gql`
  type FollowRequests {
    user: User!
    when: Date!
  }

  type JoinedLibrary {
    library: Library!
    joinedOn: Date!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    userType: String!
    profile_picture: String!
    bio: String
    isPrivate: Boolean!
    links: Links!
    booklists: [Booklist]!
    followers: [User]!
    following: [User]!
    preferences: Preferences!
    joinedLibraries: [JoinedLibrary]!
    follow_requests: [FollowRequests]!
    createdAt: Date!
    updatedAt: Date!
  }

  enum Themes {
    LIGHT
    DARK
  }
`;
