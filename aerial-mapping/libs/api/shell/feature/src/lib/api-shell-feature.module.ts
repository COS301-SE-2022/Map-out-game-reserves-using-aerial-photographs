import { Module } from '@nestjs/common';
import { DashboardResolver } from '@aerial-mapping/api/dashboard/api/feature';
import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { DashboardRepository, ApiDashboardRepositoryModule } from '@aerial-mapping/api/dashboard/repository/data-access';

@Module({
  imports: [],
  providers: [
    DashboardRepository,
    ApiDashboardRepositoryModule,
    DashboardResolver,
    PrismaService],
  exports: []
})
export class ApiShellFeatureModule {}
