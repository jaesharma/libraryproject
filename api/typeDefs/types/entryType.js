import { gql } from "apollo-server-express";

export const entryType = gql`
  enum BookAvaibilityStatus {
    AVAILABLE
    ISSUED
    NOT_AVAILABLE
  }

  type BookPosition {
    rack: String
  }

  type Issued {
    to: User!
    when: Date!
    till: Date!
  }

  type Waiting {
    user: User!
  }

  type IssueHistory {
    to: User!
    when: Date!
    till: Date!
    returned: Date
    fine_collected: Float
  }

  type Entry {
    id: ID!
    book: Book!
    price_per_copy: Float
    total_copies: Int!
    where: BookPosition
    issued_list: [Issued]!
    waiting_list: [Waiting]!
    status: BookAvaibilityStatus!
    issue_history: [IssueHistory]!
  }
`;
