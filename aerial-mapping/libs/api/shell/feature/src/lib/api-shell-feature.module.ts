import { Module } from '@nestjs/common';
import { DashboardResolver } from './dashboard.resolver';
import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { DashboardRepository } from './dashboard-repository';
import { DashboardRepositoryModule } from './dashboard-repository.module';

@Module({
  imports: [],
  providers: [DashboardRepository, DashboardRepositoryModule, DashboardResolver, PrismaService],
  exports: []
})
export class ApiShellFeatureModule {}
