import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { Test, TestingModule } from '@nestjs/testing';
import { S3UploadRepository } from "@aerial-mapping/api/s3-upload/repository/data-access";
import { S3UploadResolver } from './api-s3-upload-api.resolver';

//Run 'yarn nx test api-S3Upload'
describe('S3UploadResolver', () => {
  let resolver: S3UploadResolver;

  beforeEach(async () => {
    const module: TestingModule =
     await Test.createTestingModule({
      imports: [],
      providers: [PrismaService, S3UploadResolver, S3UploadRepository],
    }).compile();

    resolver = module.get<S3UploadResolver>(S3UploadResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

});

