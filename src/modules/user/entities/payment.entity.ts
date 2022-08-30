import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Payment {

  @Prop()
  @Field(() => Number, { description: 'Payment Month', nullable: true })
  month: number;

  @Prop()
  @Field(() => Number, { description: 'Payment Year', nullable: true })
  year: number;

}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
