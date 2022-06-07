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

  describe('@createImage', () => {
    it('should return "Success!"', async () => {
      jest
        .spyOn(repository, 'createImage')
        .mockImplementation(() => Promise.resolve('Success!'));

      expect(await repository.createImage(1, "dylpickles-image-bucket", "test.jpg")).toBe("Success!")
    })
  });

  describe('@getImage', () => {
    const IMAGE = {
      imageID:expect.any(Number),
      collectionID:expect.any(Number),
      bucket_name:expect.any(String),
      file_name:expect.any(String)
    };
    it('should return a path', async () => {
      jest
        .spyOn(repository, 'getImage')
        .mockImplementation(() => Promise.resolve(IMAGE));

      expect(await repository.getImage("dylpickles-image-bucket", "test.jpg")).toEqual(expect.objectContaining(IMAGE))
    });
  });

  describe('@createImageCollection', () => {
    it('should return "Created Image Collection!"', async () => {
      jest
        .spyOn(repository, 'createImageCollection')
        .mockImplementation(() => Promise.resolve("Created Image Collection!"));

      expect(await repository.createImageCollection(1, "CollectionName", new Date().toISOString(), true, 1)).toBe("Created Image Collection!")
    })
  });

  describe('@createImageCollection', () => {
    it('should return "Created Image Collection!"', async () => {
      jest
        .spyOn(repository, 'createImageCollection')
        .mockImplementation(() => Promise.resolve("There is a foreign key constraint violation"));

      expect(await repository.createImageCollection(-1, "", "-1", false, 2121212)).toBe("There is a foreign key constraint violation")
    })
  });

});
