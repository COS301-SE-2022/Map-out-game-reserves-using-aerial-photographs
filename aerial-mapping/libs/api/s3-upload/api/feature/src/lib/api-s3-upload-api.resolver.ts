import { forwardRef, Inject } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { S3UploadRepository } from "@aerial-mapping/api/s3-upload/repository/data-access";
import { Images, Image_Collection } from '@prisma/client';

@Resolver('s3-upload')
export class S3UploadResolver {
  constructor(@Inject(forwardRef(() => S3UploadRepository))
  private readonly repo: S3UploadRepository
  ) { }

  @Query('S3Download')
  async S3Download(path: string) {
    return await this.repo.S3Download(path);
  };

  @Query('getCatalogues')
  async getCatalogues(): Promise<Image_Collection[]|null>{
    return await this.repo.getCatalogues();
  }

  @Query('getImagesByCollectionId')
  async getImagesByCollectionId(id: number): Promise<Images[]|null>{
    return await this.repo.getImagesByCollectionId(id);
  }

  @Mutation('S3Upload')
  async S3Upload(collectionId: number, name: string, path: string) {
    return await this.repo.S3Upload(collectionId, name, path);
  };
}
