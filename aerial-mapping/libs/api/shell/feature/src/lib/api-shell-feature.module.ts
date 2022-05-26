import { Module } from '@nestjs/common';
import { DashboardResolver } from '@aerial-mapping/api/dashboard/api/feature';
import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { DashboardRepository, ApiDashboardRepositoryModule } from '@aerial-mapping/api/dashboard/repository/data-access';
import { S3UploadResolver } from '@aerial-mapping/api/s3-upload/api/feature';
import { S3UploadRepository, S3UploadRepositoryModule } from '@aerial-mapping/api/s3-upload/repository/data-access';

@Module({
  imports: [],
  providers: [
    DashboardRepository,
    ApiDashboardRepositoryModule,
    DashboardResolver,
    S3UploadRepository,
    S3UploadRepositoryModule,
    S3UploadResolver,
    PrismaService],
  exports: []
})
export class ApiShellFeatureModule {}
