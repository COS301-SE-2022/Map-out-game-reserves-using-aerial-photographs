import { forwardRef, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterRepository } from '@aerial-mapping/api/register/repository/data-access';

@Resolver('Register')
export class RegisterResolver {
  constructor(
    @Inject(forwardRef(() => RegisterRepository))
    private readonly repo: RegisterRepository
  ) { }

  @Mutation(() => String, { name: 'invite' })
  async invite(
    @Args('email', { type: () => String }) email: string,
  ) {
    return await this.repo.invite(email);
  }

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
