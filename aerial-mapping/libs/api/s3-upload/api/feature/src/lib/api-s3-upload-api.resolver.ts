import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { S3UploadRepository } from "@aerial-mapping/api/s3-upload/repository/data-access";
import { Args } from '@nestjs/graphql';
import { AuthGuard } from '@aerial-mapping/api/login/repository/data-access';

@Resolver('s3-upload')
export class S3UploadResolver {
  constructor(@Inject(forwardRef(() => S3UploadRepository))
  private readonly repo: S3UploadRepository
  ) { }

  @Query('getImage')
  @UseGuards(new AuthGuard())
  async getImage(imageID: number) {
    return await this.repo.getImage(imageID);
  };

  @Query('getImagesByCollectionId')
  @UseGuards(new AuthGuard())
  async getImagesByCollectionId(
    @Args('id') id: number
  ) {
    return await this.repo.getImagesByCollectionId(id);
  }

  @Mutation('createImage')
  @UseGuards(new AuthGuard())
  async S3Upload(collectionId: number, name: string, path: string) {
    return await this.repo.createImage(collectionId, name, path);
  };

  @Mutation('createImageCollection')
  @UseGuards(new AuthGuard())
  async createImageCollection(
    @Args('parkID') parkID: number,
    @Args('name') name: string,
    @Args('flightID') flightID: number
  ) {
    return await this.repo.createImageCollection(parkID, name, flightID);
  }

  @Mutation('createImage')
  @UseGuards(new AuthGuard())
  async createImage(
    @Args('collectionID') collectionID: number,
    @Args('bucket_name') bucket_name: string,
    @Args('file_name') file_name: string,
  ) {
    return await this.repo.createImage(collectionID, bucket_name, file_name);
  }
}
