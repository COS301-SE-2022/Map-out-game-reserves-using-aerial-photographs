import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { Module } from '@nestjs/common';
import { DashboardRepository } from './dashboard-repository';

@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [DashboardRepository],
})
export class DashboardRepositoryModule {}
