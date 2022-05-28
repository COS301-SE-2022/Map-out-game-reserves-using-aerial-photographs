import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { Module } from '@nestjs/common';
import { RegisterRepository } from './api-register-repository-data-access';

@Module({
  imports: [],
  providers: [
    PrismaService,
    RegisterRepository
  ],
  exports: [RegisterRepository],
})
export class RegisterRepositoryModule {}
