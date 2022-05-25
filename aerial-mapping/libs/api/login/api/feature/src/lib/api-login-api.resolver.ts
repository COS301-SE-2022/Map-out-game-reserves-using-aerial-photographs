import { forwardRef, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, Video, Video_Collection} from '@prisma/client';
import { LoginRepository } from '@aerial-mapping/api/login/repository/data-access';

@Resolver('User')
export class LoginResolver {
  constructor(@Inject(forwardRef(() => LoginRepository))
  private readonly repo: LoginRepository
  ) { }

  @Query('login')
  login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string): boolean {
    return true//this.repo.getAllUsers();
  };

  @Mutation('createUser')
  async createUser(
    @Args('firstname', { type: () => String }) firstname: string,
    @Args('lastname') lastname: string,
    @Args('email') email: string,
    @Args('password') hashedPassword: string,
    @Args('passwordSalt') passwordSalt: string,
    @Args('role') role: string,
    @Args('approved', { type: () => Boolean }) approved: boolean) {

    return await this.repo.createUser(firstname, lastname, email, hashedPassword, passwordSalt, role, approved);
  }

}
