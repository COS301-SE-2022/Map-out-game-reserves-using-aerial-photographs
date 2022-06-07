import { forwardRef, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, Image_Collection, Game_Park, Message } from '@prisma/client';
import { DashboardRepository } from '@aerial-mapping/api/dashboard/repository/data-access';

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

  @Query('getImageCollections')
  getImageCollections(): Promise<Image_Collection[]|null> {
    return this.repo.getImageCollections();
  }

  @Query('getMessages')
  getMessages(): Promise<Message[]|null> {
    return this.repo.getMessages();
  }

  // Mutations //
  @Mutation('createImageCollection')
  async createImageCollection(
    @Args('parkID') parkID: number,
    @Args('name') name: string,
    @Args('datetime') datetime: string,
    @Args('completed') completed: boolean,
    @Args('flightID') flightID: number){
    return await this.repo.createImageCollection(parkID, name, datetime, completed, flightID);
  }
}
