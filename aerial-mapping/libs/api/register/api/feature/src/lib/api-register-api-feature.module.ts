import { Module } from '@nestjs/common';
import { RegisterResolver } from './api-register-api.resolver';
import { RegisterRepositoryModule } from '@aerial-mapping/api/register/repository/data-access';

@Module({
  imports: [RegisterRepositoryModule],
  providers: [RegisterResolver]
})
export class ApiRegisterFeatureModule {}
