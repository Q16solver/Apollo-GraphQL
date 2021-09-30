import { UserResolver } from "@resolvers/user";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import { buildSchema } from "type-graphql";

const main = async () => {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);
  const schema = await buildSchema({
    resolvers: [UserResolver],
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

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

main().catch((err) => console.error(err));
