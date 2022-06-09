import { Module } from '@nestjs/common';
import { ImageCatalogueResolver } from './api-image-catalogue-api.resolver';
import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { ImageCatalogueRepository } from '@aerial-mapping/api/image-catalogue/repository/data-access';
import { ImageCatalogueRepositoryModule } from '@aerial-mapping/api/image-catalogue/repository/data-access';

@Module({
  imports: [],
  providers: [ImageCatalogueRepository, ImageCatalogueRepositoryModule, ImageCatalogueResolver, PrismaService],
  exports: []
})
export class ApiImageCatalogueFeatureModule {}
