import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class AddPaymentInput {
    @Field(() => Number, { description: 'Payment Month' })
    month: number;
  
    @Field(() => Number, { description: 'Payment Year' })
    year: number;
  
    @Field(() => String, { description: 'Payment Username' })
    username: string;
}