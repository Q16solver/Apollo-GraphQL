import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Event = {
  __typename?: 'Event';
  category: Scalars['String'];
  date: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['String'];
  location: Scalars['String'];
  organizer: Scalars['String'];
  time: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent: Event;
  randomMutation: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  event: Event;
  randomQuery: Scalars['String'];
};

export type CreateEventMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', id: string, category: string, title: string, description: string, location: string, date: string, time: string, organizer: string } };

export type EventQueryVariables = Exact<{ [key: string]: never; }>;


export type EventQuery = { __typename?: 'Query', event: { __typename?: 'Event', id: string, category: string, title: string, description: string, location: string, date: string, time: string, organizer: string } };


export const CreateEventDocument = gql`
    mutation CreateEvent {
  createEvent {
    id
    category
    title
    description
    location
    date
    time
    organizer
  }
}
    `;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateEventMutation();
 */
export function useCreateEventMutation(options: VueApolloComposable.UseMutationOptions<CreateEventMutation, CreateEventMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateEventMutation, CreateEventMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
}
export type CreateEventMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateEventMutation, CreateEventMutationVariables>;
export const EventDocument = gql`
    query Event {
  event {
    id
    category
    title
    description
    location
    date
    time
    organizer
  }
}
    `;

/**
 * __useEventQuery__
 *
 * To run a query within a Vue component, call `useEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useEventQuery();
 */
export function useEventQuery(options: VueApolloComposable.UseQueryOptions<EventQuery, EventQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<EventQuery, EventQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<EventQuery, EventQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<EventQuery, EventQueryVariables>(EventDocument, {}, options);
}
export type EventQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<EventQuery, EventQueryVariables>;