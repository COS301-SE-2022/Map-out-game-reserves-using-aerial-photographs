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

  describe('@S3Upload', () => {
    it('should return "Success!"', async () => {
      jest
        .spyOn(repository, 'S3Upload')
        .mockImplementation(() => Promise.resolve('Success!'));

      expect(await repository.S3Upload("dylpickles-image-bucket/test.jpg")).toBe("Success!")
    })
  });

  describe('@S3Download', () => {
    it('should return a path', async () => {
      jest
        .spyOn(repository, 'S3Upload')
        .mockImplementation(() => Promise.resolve('dylpickles-image-bucket/test.jpg'));

      expect(await repository.S3Upload("dylpickles-image-bucket/test.jpg")).toBe("dylpickles-image-bucket/test.jpg")
    })
  });

});
