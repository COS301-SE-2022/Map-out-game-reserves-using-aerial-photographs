import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { Module } from '@nestjs/common';
import { LoginRepository } from './api-login-repository-data-access';
import { AuthGuard } from './auth/guards/auth.guard';

@Module({
  providers: [
    PrismaService,
    LoginRepository,
    AuthGuard
  ],
  exports: [LoginRepository],
})
export class LoginRepositoryModule {}
