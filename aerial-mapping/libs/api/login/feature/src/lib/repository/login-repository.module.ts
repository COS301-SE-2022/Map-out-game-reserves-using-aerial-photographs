import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { Module } from '@nestjs/common';
import { LoginRepository } from './login-repository';

@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [LoginRepository],
})
export class LoginRepositoryModule {}
