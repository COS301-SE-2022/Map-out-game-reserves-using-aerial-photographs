import { Module } from '@nestjs/common';
import { DashboardResolver } from './api/dashboard.resolver';
import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { DashboardRepository } from './repository/dashboard-repository';
import { DashboardRepositoryModule } from './repository/dashboard-repository.module';

@Module({
  imports: [],
  providers: [DashboardRepository, DashboardRepositoryModule, DashboardResolver, PrismaService],
  exports: []
})
export class ApiDashboardFeatureModule {}
