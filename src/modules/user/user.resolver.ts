import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { RegisterUserInput } from './dto/register-user.input';
import { RegisterAdminInput } from "./dto/register-admin.input";
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard, CurrentUser} from "../auth/gql-auth.guard";
import { ForbiddenException, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AddPaymentInput } from './dto/add-payment.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async registerAdmin(@CurrentUser() user: User, @Args('registerAdminInput') registerAdminInput: RegisterAdminInput) {
    console.log(await this.userService.isAdmin(user.username));
    if(await this.userService.isAdmin(user.username) === true) {
      return this.userService.registerAdmin(registerAdminInput);
    }
    else {throw new ForbiddenException();}
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async registerUser(@CurrentUser() user: User, @Args('registerUserInput') registerUserInput: RegisterUserInput) {
    console.log(await this.userService.isAdmin(user.username));
    if(await this.userService.isAdmin(user.username) === true) {
      return this.userService.registerUser(registerUserInput, user.username);
    }
    else {throw new ForbiddenException();}
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard)
  async findAll(@CurrentUser() user: User) {
    if(await this.userService.isAdmin(user.username) === true) {
      return this.userService.findAll(user.username);
    }
    else {throw new ForbiddenException();}
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async addPayment(@CurrentUser() user: User, @Args('addPaymentInput') addPaymentInput: AddPaymentInput) {
    console.log(await this.userService.isAdmin(user.username));
    if(await this.userService.isAdmin(user.username) === true) {
      return this.userService.addPayment(addPaymentInput);
    }
    else {throw new ForbiddenException();}
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  findMe(@CurrentUser() user: User) {
    return this.userService.findOne(user.username);
  }

  @Query(() => User, { name: 'userName' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('username', {type: () => String}) username: String) {
    return this.userService.findOne(username);
  }
  
  @Mutation(() => User, { name: 'removeUser' })
  @UseGuards(GqlAuthGuard)
  async removeUser(@CurrentUser() user: User, @Args('_id', { type: () => String }) id: string) {
    if(await this.userService.isAdmin(user.username) === true) {
      return this.userService.remove(id);
    }
    else {throw new ForbiddenException();}
  }
}