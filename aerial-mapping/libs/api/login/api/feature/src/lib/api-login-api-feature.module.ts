import { Module } from '@nestjs/common';
import { LoginResolver } from './api-login-api.resolver';
import { LoginRepositoryModule } from '@aerial-mapping/api/login/repository/data-access';

@Module({
  imports: [LoginRepositoryModule],
  providers: [LoginResolver]
})
export class ApiLoginFeatureModule {}