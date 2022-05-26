/* eslint-disable @typescript-eslint/no-namespace */
import { Test, TestingModule } from '@nestjs/testing';
import { S3UploadRepository } from './api-s3-upload-repository-data-access';
import { PrismaService } from "@aerial-mapping/api/shared/services/prisma/data-access";

describe('S3UploadRepository', () => {
  let repository: S3UploadRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3UploadRepository, PrismaService]
    }).compile();

    repository = module.get<S3UploadRepository>(S3UploadRepository);
  });

  it('Should be defined', async () => {
    expect(repository).toBeDefined();
  });

});
