import { forwardRef, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, Video, Video_Collection} from '@prisma/client';
import { S3UploadRepository } from "@aerial-mapping/api/s3-upload/repository/data-access";

@Resolver('User')
export class S3UploadResolver {
  constructor(@Inject(forwardRef(() => S3UploadRepository))
  private readonly repo: S3UploadRepository
  ) { }

  @Mutation('S3Upload')
  S3Upload(): string {
    return this.repo.S3Upload()
  };

}
