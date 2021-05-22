import { gql } from "apollo-server-express";

export const preferencesType = gql`
  type Preferences {
    theme: Themes!
  }
`;
