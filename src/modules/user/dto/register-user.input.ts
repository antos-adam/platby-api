import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  @Field(() => String, { description: 'User Username', nullable: true })
  username: string;

  @Field(() => String, { description: 'User Password', nullable: true })
  password: string;

  @Field(() => String, { description: 'User Full name', nullable: true })
  name: string;
}