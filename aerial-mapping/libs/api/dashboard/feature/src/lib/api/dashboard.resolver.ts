import { forwardRef, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, Video_Collection, Game_Park, Message } from '@prisma/client';
import { DashboardRepository } from '../repository/dashboard-repository';

@Resolver('User')
export class DashboardResolver {
  constructor(@Inject(forwardRef(() => DashboardRepository))
  private readonly repo: DashboardRepository
  ) { }

  @Query('getUsers')
  getUsers(): Promise<User[]|null> {
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

  @Query('getMessages')
  getMessages(): Promise<Message[]|null> {
    return this.repo.getMessages();
  }

  @Query('getNumOfVidsPerDate')
  getNumOfVidsPerDate(): Promise<number> {
    return this.repo.getNumOfVidsPerDate();
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
