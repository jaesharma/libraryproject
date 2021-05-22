import { gql } from "apollo-server-express";

const modificationHistoryType = gql`
  type History {
    date: Date!
    modifier: users
  }

  type ModificationHistory {
    history: [History]!
  }
`;

module.exports = {
  modificationHistoryType,
};
