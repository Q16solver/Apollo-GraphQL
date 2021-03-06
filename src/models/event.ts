import "reflect-metadata";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Event {
  @Field()
  id: string;

  @Field()
  category: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  location: string;

  @Field()
  date: string;

  @Field()
  time: string;

  @Field()
  organizer: string;
}

@InputType()
export class EventInput {
  @Field()
  category: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  location: string;

  @Field()
  date: string;

  @Field()
  time: string;

  @Field()
  organizer: string;
}
