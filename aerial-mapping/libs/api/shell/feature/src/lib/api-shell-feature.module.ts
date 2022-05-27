import { Module } from '@nestjs/common';
import { DashboardResolver } from '@aerial-mapping/api/dashboard/api/feature';
import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { DashboardRepository, ApiDashboardRepositoryModule } from '@aerial-mapping/api/dashboard/repository/data-access';
import { LoginRepository, LoginRepositoryModule } from '@aerial-mapping/api/login/repository/data-access';
import { LoginResolver } from '@aerial-mapping/api/login/api/feature';

@Module({
  imports: [],
  providers: [
    DashboardRepository,
    ApiDashboardRepositoryModule,
    DashboardResolver,
    LoginRepository,
    LoginRepositoryModule,
    LoginResolver,
    PrismaService
  ],
  exports: []
})
export class ApiShellFeatureModule {}
