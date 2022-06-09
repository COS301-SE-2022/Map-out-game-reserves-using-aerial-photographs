import { forwardRef, Inject } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { S3UploadRepository } from "@aerial-mapping/api/s3-upload/repository/data-access";
import { Args } from '@nestjs/graphql';

@Resolver('s3-upload')
export class S3UploadResolver {
  constructor(@Inject(forwardRef(() => S3UploadRepository))
  private readonly repo: S3UploadRepository
  ) { }

  @Query('getImage')
  async getImage(imageID: number) {
    return await this.repo.getImage(imageID);
  };

  @Query('getImagesByCollectionId')
  async getImagesByCollectionId(
    @Args('id') id: number
  ) {
    return await this.repo.getImagesByCollectionId(id);
  }

  @Mutation('createImage')
  async S3Upload(collectionId: number, name: string, path: string) {
    return await this.repo.createImage(collectionId, name, path);
  };

  @Mutation('createImageCollection')
  async createImageCollection(
    @Args('parkID') parkID: number,
    @Args('name') name: string,
    @Args('datetime') datetime: string,
    @Args('completed') completed: boolean,
    @Args('flightID') flightID: number
  ) {
    return await this.repo.createImageCollection(parkID, name, datetime, completed, flightID);
  }
}
