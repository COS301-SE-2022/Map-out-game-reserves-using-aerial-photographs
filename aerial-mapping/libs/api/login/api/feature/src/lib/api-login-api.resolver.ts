import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginRepository } from '@aerial-mapping/api/login/repository/data-access';
import { AuthGuard } from '@aerial-mapping/api/login/repository/data-access';
import { User } from '@prisma/client';

@Resolver('Login')
export class LoginResolver {
  constructor(
    @Inject(forwardRef(() => LoginRepository))
    private readonly repo: LoginRepository
  ) { }

  @Query('test')
  @UseGuards(new AuthGuard())
  test() {
    return "Test";
  }

  @Mutation('login')
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    return await this.repo.login(email, password).then((obj) => {
      return obj.access_token;
    });
  };


  @Mutation(() => String, { name: 'createUser', nullable: true })
  async createUser(
    @Args('firstname', { type: () => String }) firstname: string,
    @Args('lastname') lastname: string,
    @Args('email') email: string,
    @Args('password') hashedPassword: string,
    @Args('passwordSalt') passwordSalt: string,
    @Args('role') role: string,
    @Args('approved', { type: () => Boolean }) approved: boolean) {

    return await this.repo.createUser(firstname, lastname, email, hashedPassword, role, approved);
  }

}
