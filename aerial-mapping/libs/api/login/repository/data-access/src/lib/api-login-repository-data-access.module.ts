import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { Module } from '@nestjs/common';
import { LoginRepository } from './api-login-repository-data-access';

@Module({
  imports: [],
  providers: [
    PrismaService,
    LoginRepository
  ],
  exports: [LoginRepository],
})
export class LoginRepositoryModule {}
