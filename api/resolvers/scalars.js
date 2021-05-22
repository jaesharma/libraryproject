import { GraphQLUpload } from "apollo-server-core";
import { GraphQLDateTime } from "graphql-iso-date";

const customScalarResolvers = {
  Date: GraphQLDateTime,
  Upload: GraphQLUpload,
};

export default customScalarResolvers;
