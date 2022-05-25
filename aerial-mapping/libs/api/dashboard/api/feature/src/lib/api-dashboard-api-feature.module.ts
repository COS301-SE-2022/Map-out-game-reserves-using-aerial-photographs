import { Module } from '@nestjs/common';
import { DashboardResolver } from './api-dashboard-api.resolver';
import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { DashboardRepository } from '@aerial-mapping/api/dashboard/repository/data-access';
import { ApiDashboardRepositoryModule } from '@aerial-mapping/api/dashboard/repository/data-access';

@Module({
  imports: [],
  providers: [DashboardRepository, ApiDashboardRepositoryModule, DashboardResolver, PrismaService],
  exports: [DashboardRepository]
})
export class ApiDashboardApiFeatureModule {}
