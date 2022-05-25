import { Module } from '@nestjs/common';
import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { DashboardRepository } from './api-dashboard-repository-data-access';

@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [DashboardRepository],
})
export class ApiDashboardRepositoryModule {}
