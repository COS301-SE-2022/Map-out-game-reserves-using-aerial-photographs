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
}
