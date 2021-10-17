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

export type EventInput = {
  category: Scalars['String'];
  date: Scalars['String'];
  description: Scalars['String'];
  location: Scalars['String'];
  organizer: Scalars['String'];
  time: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent: Event;
};


export type MutationCreateEventArgs = {
  input: EventInput;
};

export type Query = {
  __typename?: 'Query';
  getEvent: Event;
};

export type Subscription = {
  __typename?: 'Subscription';
  event: Event;
};

export type RegularEventFragment = { __typename?: 'Event', id: string, category: string, title: string, description: string, location: string, date: string, time: string, organizer: string };

export type CreateEventMutationVariables = Exact<{
  input: EventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', id: string, category: string, title: string, description: string, location: string, date: string, time: string, organizer: string } };

export type GetEventQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventQuery = { __typename?: 'Query', getEvent: { __typename?: 'Event', id: string, category: string, title: string, description: string, location: string, date: string, time: string, organizer: string } };

export type EventSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type EventSubscription = { __typename?: 'Subscription', event: { __typename?: 'Event', id: string, category: string, title: string, description: string, location: string, date: string, time: string, organizer: string } };

export const RegularEventFragmentDoc = gql`
    fragment RegularEvent on Event {
  id
  category
  title
  description
  location
  date
  time
  organizer
}
    `;
export const CreateEventDocument = gql`
    mutation CreateEvent($input: EventInput!) {
  createEvent(input: $input) {
    ...RegularEvent
  }
}
    ${RegularEventFragmentDoc}`;

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
 * const { mutate, loading, error, onDone } = useCreateEventMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventMutation(options: VueApolloComposable.UseMutationOptions<CreateEventMutation, CreateEventMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateEventMutation, CreateEventMutationVariables>>) {
  return VueApolloComposable.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
}
export type CreateEventMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateEventMutation, CreateEventMutationVariables>;
export const GetEventDocument = gql`
    query GetEvent {
  getEvent {
    ...RegularEvent
  }
}
    ${RegularEventFragmentDoc}`;

/**
 * __useGetEventQuery__
 *
 * To run a query within a Vue component, call `useGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetEventQuery();
 */
export function useGetEventQuery(options: VueApolloComposable.UseQueryOptions<GetEventQuery, GetEventQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetEventQuery, GetEventQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetEventQuery, GetEventQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, {}, options);
}
export type GetEventQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetEventQuery, GetEventQueryVariables>;
export const EventDocument = gql`
    subscription Event {
  event {
    ...RegularEvent
  }
}
    ${RegularEventFragmentDoc}`;

/**
 * __useEventSubscription__
 *
 * To run a query within a Vue component, call `useEventSubscription` and pass it any options that fit your needs.
 * When your component renders, `useEventSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useEventSubscription();
 */
export function useEventSubscription(options: VueApolloComposable.UseSubscriptionOptions<EventSubscription, EventSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<EventSubscription, EventSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<EventSubscription, EventSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<EventSubscription, EventSubscriptionVariables>(EventDocument, {}, options);
}
export type EventSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<EventSubscription, EventSubscriptionVariables>;