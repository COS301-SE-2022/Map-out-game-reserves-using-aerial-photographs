import { forwardRef, Inject } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { S3UploadRepository } from "@aerial-mapping/api/s3-upload/repository/data-access";
import { Args } from '@nestjs/graphql';

@Resolver('User')
export class S3UploadResolver {
  constructor(@Inject(forwardRef(() => S3UploadRepository))
  private readonly repo: S3UploadRepository
  ) { }

  @Mutation('S3Upload')
  S3Upload(): string {
    return this.repo.S3Upload()
  };

  @Mutation('createImageCollection')
  async createImageCollection(
    @Args('parkID') parkID: number,
    @Args('datetime') datetime: string,
    @Args('flightID') flightID: number){
    return await this.repo.createImageCollection(parkID, datetime, flightID);
  }
}
