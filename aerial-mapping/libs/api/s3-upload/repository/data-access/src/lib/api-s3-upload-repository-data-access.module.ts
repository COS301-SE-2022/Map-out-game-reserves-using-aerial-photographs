import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { Module } from '@nestjs/common';
import { S3UploadRepository } from './api-s3-upload-repository-data-access';

@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [S3UploadRepository],
})
export class S3UploadRepositoryModule {}
