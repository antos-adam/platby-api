import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Payment } from './payment.entity';

@Schema()
@ObjectType()
export class User {

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'User Username', nullable: true })
  username: string;

  @Prop()
  @Field(() => String, { description: 'User Password', nullable: true })
  password: string;

  @Prop()
  @Field(() => String, { description: 'User Full name', nullable: true })
  name: string;

  @Prop()
  @Field(() => Boolean, { description: 'Is user admin?', nullable: true })
  isAdmin: boolean;

  @Prop()
  @Field(() => String, { description: 'User Account number', nullable: true })
  accountNumber: string;

  @Prop()
  @Field(() => String, { description: 'User Bank code', nullable: true })
  bankCode: string;

  @Prop()
  @Field(() => String, { description: 'User Family Id', nullable: true })
  familyId: string;

  @Prop()
  @Field(() => Boolean, { description: 'User Paid this month', nullable: true })
  paid: boolean;

  @Prop()
  @Field(() => [Payment], { description: 'User Family Id', nullable: true })
  payments: [Payment];
}

export const UserSchema = SchemaFactory.createForClass(User);
