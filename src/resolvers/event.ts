import { Event, EventInput } from "models/event";
import "reflect-metadata";
import { Arg, Mutation, Publisher, PubSub, Query, Resolver, Root, Subscription } from "type-graphql";
import { makeId } from "util/util";
import { v4 as uuidv4 } from "uuid";

@Resolver()
export class EventResolver {
  @Query(() => Event)
  async getEvent(): Promise<Event> {
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
  async createEvent(
    @Arg("input", () => EventInput) input: EventInput,
    @PubSub("Event") publish: Publisher<Event>
  ): Promise<Event> {
    const event = { id: uuidv4(), ...input };
    await publish(event);
    return event;
  }

  @Subscription(() => Event, { topics: "Event" })
  async event(@Root() payload: Event): Promise<Event> {
    return payload;
  }
}
