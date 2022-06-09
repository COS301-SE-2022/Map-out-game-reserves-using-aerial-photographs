import { forwardRef, Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { ImageCatalogueRepository } from "@aerial-mapping/api/s3-upload/repository/data-access";
import { Args } from '@nestjs/graphql';

@Resolver('image-catalogue')
export class ImageCatalogueResolver {
  constructor(@Inject(forwardRef(() => ImageCatalogueRepository))
  private readonly repo: ImageCatalogueRepository
  ) { }


}
