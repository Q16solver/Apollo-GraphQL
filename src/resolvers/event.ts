import { Event } from "models/event";
import "reflect-metadata";
import { Mutation, Query, Resolver } from "type-graphql";
import { makeId } from "util/util";
import { v4 as uuidv4 } from "uuid";

@Resolver()
export class EventResolver {
  @Query(() => String)
  async randomQuery(): Promise<string> {
    return makeId(10);
  }

  @Query(() => Event)
  async event(): Promise<Event> {
    return {
      id: uuidv4(),
      category: makeId(10),
      title: makeId(10),
      description: makeId(10),
      location: makeId(10),
      date: makeId(10),
      time: makeId(10),
      organizer: makeId(10),
    };
  }

  @Mutation(() => Event)
  async createEvent(): Promise<Event> {
    return {
      id: uuidv4(),
      category: makeId(10),
      title: makeId(10),
      description: makeId(10),
      location: makeId(10),
      date: makeId(10),
      time: makeId(10),
      organizer: makeId(10),
    };
  }

  @Mutation(() => String)
  async randomMutation(): Promise<string> {
    return makeId(10);
  }
}
