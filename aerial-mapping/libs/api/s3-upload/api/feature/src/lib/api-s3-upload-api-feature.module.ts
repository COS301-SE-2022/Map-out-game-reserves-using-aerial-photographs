import { Module } from '@nestjs/common';
import { S3UploadResolver } from './api-s3-upload-api.resolver';
import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { S3UploadRepository } from '@aerial-mapping/api/s3-upload/repository/data-access';
import { S3UploadRepositoryModule } from '@aerial-mapping/api/s3-upload/repository/data-access';

@Module({
  imports: [],
  providers: [S3UploadRepository, S3UploadRepositoryModule, S3UploadResolver, PrismaService],
  exports: []
})
export class ApiS3UploadFeatureModule {}
