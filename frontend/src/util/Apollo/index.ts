import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  FetchResult,
  InMemoryCache,
  Operation,
  split,
} from '@apollo/client/core';
import { getMainDefinition, Observable } from '@apollo/client/utilities';
import { createApolloProvider } from '@vue/apollo-option';
import { GraphQLError, print } from 'graphql';
import {
  Client,
  ClientOptions,
  createClient as createWsClient,
} from 'graphql-ws';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/graphql',
});

export class WebSocketLink extends ApolloLink {
  private client: Client;
  private restartRequested = false;

  constructor(options: ClientOptions) {
    super();
    this.client = createWsClient({
      ...options,
      on: {
        ...options.on,
        opened: (socket) => {
          const wsSocket = socket as WebSocket;
          options.on?.opened?.(wsSocket);

          this.restart = () => {
            // if the socket is still open for the restart, do the restart
            if (wsSocket.readyState === WebSocket.OPEN)
              wsSocket.close(4205, 'Client Restart');
            // otherwise the socket might've closed, indicate that you want
            // a restart on the next opened event
            else this.restartRequested = true;
          };

          // just in case you were eager to restart
          if (this.restartRequested) {
            this.restartRequested = false;
            this.restart();
          }
        },
      },
    });
  }

  public request = (operation: Operation): Observable<FetchResult> =>
    new Observable((sink) => {
      return this.client.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: (err) => {
            if (err instanceof Error) return sink.error(err);
            else if (err instanceof CloseEvent)
              return sink.error(
                // reason will be available on clean closes
                new Error(
                  `Socket closed with event ${err.code} ${err.reason || ''}`
                )
              );
            else
              return sink.error(
                new Error(
                  (err as GraphQLError[])
                    .map(({ message }) => message)
                    .join(', ')
                )
              );
          },
        }
      );
    });

  public restart = () => {
    this.restartRequested = true;
  };
}

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  url: 'ws://localhost:4000/subscriptions',
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link,
  cache,
});

export const provider = createApolloProvider({
  defaultClient: apolloClient,
});
