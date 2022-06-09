import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  userID!: number;

  @Field(() => String)
  user_name!: string;

  @Field(() => String)
  user_email!: string;

  @Field(() => String)
  user_password?: string;

  @Field(() => String)
  user_password_salt?: string;

  @Field(() => String)
  user_role!: string;

  @Field(() => Boolean)
  user_approved!: boolean;
}
