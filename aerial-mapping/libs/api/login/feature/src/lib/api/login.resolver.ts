import { forwardRef, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, Video, Video_Collection} from '@prisma/client';
import { LoginRepository } from '../repository/login-repository';

@Resolver('User')
export class LoginResolver {
  constructor(@Inject(forwardRef(() => LoginRepository))
  private readonly repo: LoginRepository
  ) { }

  @Query('login')
  login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string): boolean {
    return this.repo.getAllSets();
  };
}
