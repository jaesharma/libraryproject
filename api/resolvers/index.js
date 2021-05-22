import mutations from "./mutations/index";
import queries from "./queries/index";
import customScalarResolvers from "./scalars";
import unionResolvers from "./unionResolvers";

export const resolvers = {
  ...unionResolvers,
  ...customScalarResolvers,
  Query: queries,
  Mutation: mutations,
};
