import { forwardRef, Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { User, Video, Video_Collection} from '@prisma/client';
import { DashboardRepository } from './dashboard-repository';

@Resolver('User')
export class DashboardResolver {
  constructor(@Inject(forwardRef(() => DashboardRepository))
  private readonly repo: DashboardRepository
  ) { }

  @Query('user')
  user(@Args('name', { type: () => String }) _name: string): Promise<User|null> {
    return this.repo.getAllSets();
  };

  @Query('getVideoCollections')
  getVideoCollections(): Promise<Video_Collection[]|null> {
    return this.repo.getVideoCollections();
  }

  // @Mutation()
  // addSet(
  //   @Args('name') name: string,
  //   @Args('year') year: string,
  //   @Args('numParts') numParts: number
  // ) {
  //   const newSet = {
  //     id: this.sets.length + 1,
  //     name,
  //     year,
  //     numParts: +numParts
  //   };

  //   this.sets.push(newSet);

  //   return newSet;
  // }
}
