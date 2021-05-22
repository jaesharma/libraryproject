import { ApolloError, ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { typeDefs } from "./typeDefs/index";
import { resolvers } from "./resolvers/index";
import getUser from "./utils/getUser";
import UploadRoutes from "./routes/uploadRoutes";
import { GraphQLError } from "graphql";
import { v4 } from "uuid";

export let gfs;

const startServer = async () => {
  const app = express();
  app.use(express.json());
  app.use(UploadRoutes);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      const userInfo = await getUser(token);
      return { ...userInfo };
    },
    // formatError: (error) => {
    //   if (error.originalError instanceof ApolloError) {
    //     return error;
    //   }
    //   const errId = v4();
    //   return new GraphQLError(`Internal Server Error: ${errId}`);
    // },
  });
  server.applyMiddleware({ app });
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const conn = mongoose.connection;
  if (conn !== undefined) {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "uploads",
    });
  }

  app.listen({ port: process.env.PORT }, () => {
    console.log(
      `Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
    );
  });
};

startServer();
