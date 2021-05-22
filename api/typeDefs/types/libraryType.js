import { gql } from "apollo-server-express";

const libraryType = gql`
  enum Duration {
    DAILY
    WEEKLY
    MONTHLY
    QUARTELY
    HALF_YEARLY
    YEARLY
  }

  type Contact {
    email: String!
    phone: Float
  }

  type LibraryMember {
    user: User!
    joined: Date!
    membership_plan: String!
    membership_expires_on: Date!
    currently_issued: Int!
  }

  type LibraryMembershipPlan {
    title: String!
    duration: Duration!
    fees: Float!
    description: String
    issue_limit: Int!
  }

  enum IDMethod {
    AADHAAR
    COLLEGE_ID
    LIBRARY_CARD
  }

  type LibraryMemberIDMethod {
    is_required: Boolean!
    identification_type: IDMethod!
  }

  type JoinRequest {
    user: User!
    note: String
    identity: String
    when: Date!
  }

  type LibraryLocation {
    country: String
    address: String
    lat: String
    long: String
  }

  type MembershipRenewRequest {
    user: User!
    note: String
    when: Date!
  }

  type Library {
    id: ID!
    name: String!
    username: String!
    about: String
    logo: String
    staff: [StaffMember]!
    members: [LibraryMember]!
    membership_plans: [LibraryMembershipPlan!]!
    booklists: [Booklist!]!
    identification_method: LibraryMemberIDMethod!
    requests: [JoinRequest]!
    membership_renew_requests: [MembershipRenewRequest]!
    entries: [Entry]!
    location: LibraryLocation
    contact: Contact!
    links: Links!
    createdAt: Date!
    updatedAt: Date!
  }
`;

module.exports = {
  libraryType,
};
