import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class RegisterAdminInput {
    @Field(() => String, { description: 'User Username', nullable: true })
    username: string;
  
    @Field(() => String, { description: 'User Password', nullable: true })
    password: string;
  
    @Field(() => String, { description: 'User Full name', nullable: true })
    name: string;
  
    @Field(() => String, { description: 'User Account number', nullable: true })
    accountNumber: string;
  
    @Field(() => String, { description: 'User Bank code', nullable: true })
    bankCode: string;
  
    @Field(() => String, { description: 'User Family Id', nullable: true })
    familyId: string;
}