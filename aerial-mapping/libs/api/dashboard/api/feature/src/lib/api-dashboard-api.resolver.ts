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

  @Query('getImageCollection')
  getImageCollection(): Promise<Image_Collection[]|null> {
    return this.repo.getImageCollection();
  }

  @Query('getMessages')
  getMessages(): Promise<Message[]|null> {
    return this.repo.getMessages();
  }

  // @Query('getNumOfVidsPerDate')
  // getNumOfVidsPerDate(): Promise<number> {
  //   return this.repo.getNumOfVidsPerDate();
  // }

  // Mutations //
  @Mutation('createImageCollection')
  async createImageCollection(
    @Args('parkID') parkID: number,
    @Args('datetime') datetime: string,
    @Args('flightID') flightID: number){
    return await this.repo.createImageCollection(parkID, datetime, flightID);
  }
}
