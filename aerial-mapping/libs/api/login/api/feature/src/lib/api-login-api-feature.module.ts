import { Module } from '@nestjs/common';
import { LoginResolver } from './api-login-api.resolver';
import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { LoginRepository } from '@aerial-mapping/api/login/repository/data-access';
import { LoginRepositoryModule } from '@aerial-mapping/api/login/repository/data-access';

@Module({
  imports: [],
  providers: [LoginRepository, LoginRepositoryModule, LoginResolver, PrismaService],
  exports: []
})
export class ApiLoginFeatureModule {}
