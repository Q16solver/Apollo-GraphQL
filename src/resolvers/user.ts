import { makeId } from "@/util/util";
import "reflect-metadata";
import { Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => String)
  async randomQuery(): Promise<string> {
    return makeId(10);
  }

  @Mutation(() => String)
  async randomMutation(): Promise<string> {
    return makeId(10);
  }
}
