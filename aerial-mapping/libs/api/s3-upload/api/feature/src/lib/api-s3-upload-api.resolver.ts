import { forwardRef, Inject } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { S3UploadRepository } from "@aerial-mapping/api/s3-upload/repository/data-access";

@Resolver('User')
export class S3UploadResolver {
  constructor(@Inject(forwardRef(() => S3UploadRepository))
  private readonly repo: S3UploadRepository
  ) { }

  @Query('S3Download')
  async S3Download(path: string) {
    return await this.repo.S3Download(path);
  };

  @Mutation('S3Upload')
  async S3Upload(collectionId: number, path: string) {
    return await this.repo.S3Upload(collectionId, path);
  };

  @Query('getCatalogues')
  async getCatalogues() {
    return await this.repo.getCatalogues();
  }

}
