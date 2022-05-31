import { forwardRef, Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
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

  //should have a role guard so that only admin roles can create new users
  @Mutation(() => String, { name: 'registerUser', nullable: true })
  async registerUser(
    @Args('firstname', { type: () => String }) firstname: string,
    @Args('lastname') lastname: string,
    @Args('email') email: string,
    @Args('password') hashedPassword: string,
    @Args('role') role: string,
    @Args('approved', { type: () => Boolean }) approved: boolean) {

    if(await this.repo.removePendingInvite(email)) {
      return await this.repo.createUser(firstname, lastname, email, hashedPassword, role, approved);
    }  else {
      return "This email address has not been invited.";
    }
  }

}
