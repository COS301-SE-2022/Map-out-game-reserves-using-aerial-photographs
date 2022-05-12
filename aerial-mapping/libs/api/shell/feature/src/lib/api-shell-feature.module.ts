import { Module } from '@nestjs/common';
import { DashboardResolver } from '@aerial-mapping/api/dashboard';
import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { DashboardRepository, DashboardRepositoryModule } from '@aerial-mapping/api/dashboard';

@Module({
  imports: [],
  providers: [
    DashboardRepository,
    DashboardRepositoryModule,
    DashboardResolver,
    PrismaService],
  exports: []
})
export class ApiShellFeatureModule {}
