import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterRepository } from '@aerial-mapping/api/register/repository/data-access';
import { AuthGuard } from '@aerial-mapping/api/login/repository/data-access';

@Resolver('Register')
export class RegisterResolver {
  constructor(
    @Inject(forwardRef(() => RegisterRepository))
    private readonly repo: RegisterRepository
  ) { }

  @Mutation(() => String, { name: 'invite' })
  //@UseGuards(new AuthGuard())
  async invite(
    @Args('email', { type: () => String }) email: string,
  ) {
    return await this.repo.invite(email);
  }

  @Mutation(() => String, { name: 'registerUser', nullable: true })
  //@UseGuards(new AuthGuard())
  async registerUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') hashedPassword: string,
    @Args('role') role: string,
    @Args('approved', { type: () => Boolean }) approved: boolean) {

    if(await this.repo.removePendingInvite(email)) {
      return await this.repo.createUser(name, email, hashedPassword, role, approved);
    }
    return null;
  }

}
