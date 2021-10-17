import { EventResolver } from "@resolvers/event";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { useServer } from "graphql-ws/lib/use/ws";
import http from "http";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import ws from "ws";

const main = async () => {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);
  const schema = await buildSchema({
    resolvers: [EventResolver],
    validate: false,
  });

  // Same ApolloServer initialization as before, plus the drain plugin.
  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // More required logic for integrating with Express
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // Server startup
  const server = httpServer.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);

    const wsServer = new ws.Server({ server, path: "/subscriptions" });

    useServer(
      {
        schema,
        onConnect: async () => {
          console.log("Subscription client connected");
        },
        onDisconnect: () => {
          console.log("Subscription client disconnected");
        },
      },
      wsServer,
      60 * 1000
    );
  });
};

main().catch((err) => console.error(err));
