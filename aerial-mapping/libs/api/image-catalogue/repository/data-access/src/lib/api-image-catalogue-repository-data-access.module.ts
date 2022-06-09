import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { Module } from '@nestjs/common';
import { ImageCatalogueRepository } from './api-image-catalogue-repository-data-access';

@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [ImageCatalogueRepository],
})
export class ImageCatalogueRepositoryModule {}
