import { forwardRef, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, Video, Video_Collection, Game_Park } from '@prisma/client';
import { DashboardRepository } from '../repository/dashboard-repository';

@Resolver('User')
export class DashboardResolver {
  constructor(@Inject(forwardRef(() => DashboardRepository))
  private readonly repo: DashboardRepository
  ) { }

  @Query('getUsers')
  getUsers(): Promise<User|null> {
    return this.repo.getAllUsers();
  };

  @Query('getParks')
  getParks(): Promise<Game_Park[]|null> {
    return this.repo.getParks();
  }

  @Query('getVideoCollections')
  getVideoCollections(): Promise<Video_Collection[]|null> {
    return this.repo.getVideoCollections();
  }

  // Mutations //
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

  @Mutation('createVideoCollection')
  async createVideoCollection(@Args('parkID') parkID: number) {
    return await this.repo.createVideoCollection(parkID);
  }
}
