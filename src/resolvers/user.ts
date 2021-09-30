import "reflect-metadata";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => String)
  async me(): Promise<string> {
    return "Yes";
  }
}
