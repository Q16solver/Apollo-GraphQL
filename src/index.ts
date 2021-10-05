import { EventResolver } from "@resolvers/event";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import "reflect-metadata";
import { buildSchema } from "type-graphql";

const main = async () => {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);
  const schema = await buildSchema({
    resolvers: [EventResolver],
    validate: false,
  });

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({ app });

  // Server startup
  httpServer.listen(4000, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
};

main().catch((err) => console.error(err));
