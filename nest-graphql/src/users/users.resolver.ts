import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  // async users(@Args('bool') bool: boolean): Promise<User[]> {
  async users(): Promise<User[]> {
    return await this.usersService.find();
  }

  @Mutation(() => Boolean)
  async createUser(@Args() createUserDto: CreateUserDto): Promise<boolean> {
    // console.log(createUserDto);
    await this.usersService.create(createUserDto);
    return true;
  }
}