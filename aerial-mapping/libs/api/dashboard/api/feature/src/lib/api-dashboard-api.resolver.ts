import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, Image_Collection, Game_Park, Message } from '@prisma/client';
import { DashboardRepository } from '@aerial-mapping/api/dashboard/repository/data-access';
import { AuthGuard } from '@aerial-mapping/api/login/repository/data-access';

@Resolver('User')
export class DashboardResolver {
  constructor(@Inject(forwardRef(() => DashboardRepository))
  private readonly repo: DashboardRepository
  ) { }

  @Query('getUsers')
  //@UseGuards(new AuthGuard())
  getUsers(): Promise<User[]|null> {
    return this.repo.getAllUsers();
  };

  @Query('getParks')
  //@UseGuards(new AuthGuard())
  getParks(): Promise<Game_Park[]|null> {
    return this.repo.getParks();
  }

  @Query('getImageCollections')
  //@UseGuards(new AuthGuard())
  getImageCollections(): Promise<Image_Collection[]|null> {
    return this.repo.getImageCollections();
  }

  @Query('getMessages')
  //@UseGuards(new AuthGuard())
  getMessages(): Promise<Message[]|null> {
    return this.repo.getMessages();
  }

  // Mutations //
  @Mutation('createImageCollection')
  //@UseGuards(new AuthGuard())
  async createImageCollection(
    @Args('parkID') parkID: number,
    @Args('name') name: string,
    @Args('datetime') datetime: string,
    @Args('completed') completed: boolean,
    @Args('flightID') flightID: number){
    return await this.repo.createImageCollection(parkID, name, datetime, completed, flightID);
  }
}
