import { Injectable } from '@nestjs/common';
import { RegisterUserInput } from './dto/register-user.input';
import { RegisterAdminInput } from './dto/register-admin.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AddPaymentInput } from "./dto/add-payment.input";
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async registerAdmin(registerAdminInput: RegisterAdminInput) {
    const userDb = await this.userModel.findOne({ username: registerAdminInput.username }).exec();
    if (userDb) {
      return undefined;
    }
    try{
      const user = new this.userModel(registerAdminInput);
      const hash = await bcrypt.hash(registerAdminInput.password, 10);
      user.password = hash;
      user.isAdmin = true;
      return user.save();
    }
    catch (error) {
      return new Error(error.message)
    }
  }

  async registerUser(registerUserInput: RegisterUserInput, adminUsername: string) {
    const userDb = await this.userModel.findOne({ username: registerUserInput.username }).exec();
    const adminUser = await this.userModel.findOne({ username: adminUsername }).exec();
    if (userDb) {
      return undefined;
    }
    try{
      const user = new this.userModel(registerUserInput);
      const hash = await bcrypt.hash(registerUserInput.password, 10);
      user.password = hash;
      user.familyId = adminUser.familyId;
      return user.save();
    }
    catch (error) {
      return new Error(error.message)
    }
  }

  async findAll(adminUsername: string) {
    try{
      const adminUser = await this.userModel.findOne({ username: adminUsername }).exec();
      const users = await this.userModel.find({familyId: adminUser.familyId});

      if (!users) {
        return "Users not found"
      }
      return users;
    }
    catch (error) {
      return new Error(error.message)
    }
  }

  async findOne(username: String): Promise<User | undefined> {
    try{
      const user = await this.userModel.findOne({ username: username }).exec();
    if (!user) {
      return undefined;
    }
    return user;
    }
    catch (error) {
      return undefined;
    }
  }

  async isAdmin(username: String): Promise<boolean> {
    try{
      const user = await this.userModel.findOne({ username: username }).exec();
    if (!user) {
      return false;
    }
    if (user.isAdmin) {return true}
    else {return false}
    }
    catch (error) {
      return false;
    }
  }

  // async update(id: string, updateUserInput: UpdateUserInput) {
  //   try{
  //     const user = await this.userModel.findOne({ _id: id }).exec();
  //   if (!user) {
  //     return "User not found"
  //   }

  //   if (updateUserInput.username) {user.username = updateUserInput.username;}
  //   if (updateUserInput.password) {
  //     const hash = await bcrypt.hash(updateUserInput.password, 10);
  //     user.password = hash;
  //   }
  //   if (updateUserInput.name) {user.name = updateUserInput.name;}

  //   return user.save();
  //   }
  //   catch (error) {
  //     return new Error(error.message)
  //   }
  // }

  async remove(id: string) {
    try{
      const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      return "User not found"
    }

    return user.remove();
    }
    catch (error) {
      return new Error(error.message)
    }
  }

  async addPayment(addPaymentInput: AddPaymentInput) {
    try{
      const user = await this.userModel.findOne({ username: addPaymentInput.username }).exec();
    if (!user) {
      return undefined;
    }
    user.payments.push({
      month: addPaymentInput.month,
      year: addPaymentInput.year
    })
    return user.save();
    }
    catch (error) {
      return undefined;
    }
  }

}


