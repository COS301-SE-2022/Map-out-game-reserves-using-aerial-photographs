import { Module } from '@nestjs/common';
import { LoginResolver } from './api/login.resolver';
import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { LoginRepository } from './repository/login-repository';
import { LoginRepositoryModule } from './repository/login-repository.module';

@Module({
  imports: [],
  providers: [LoginRepository, LoginRepositoryModule, LoginResolver, PrismaService],
  exports: []
})
export class ApiLoginFeatureModule {}
