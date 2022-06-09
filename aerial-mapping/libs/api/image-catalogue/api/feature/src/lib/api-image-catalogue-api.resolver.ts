import { forwardRef, Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { S3UploadRepository } from "@aerial-mapping/api/s3-upload/repository/data-access";

@Resolver('image-catalogue')
export class ImageCatalogueResolver {
  constructor(@Inject(forwardRef(() => S3UploadRepository))
  private readonly repo: S3UploadRepository
  ) { }


}
