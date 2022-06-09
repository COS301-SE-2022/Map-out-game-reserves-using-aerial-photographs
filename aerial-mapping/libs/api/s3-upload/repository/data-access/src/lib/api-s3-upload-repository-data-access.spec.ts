/* eslint-disable @typescript-eslint/no-namespace */
import { Test, TestingModule } from '@nestjs/testing';
import { S3UploadRepository } from './api-s3-upload-repository-data-access';
import { PrismaService } from "@aerial-mapping/api/shared/services/prisma/data-access";
import { Images, Image_Collection } from '@prisma/client';

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
    it('should return the created image.', async () => {
      const image: Images = {
        imageID: expect.any(Number),
        collectionID: expect.any(Number),
        file_name: expect.any(String),
        bucket_name: expect.any(String)
      }

      jest
        .spyOn(repository, 'createImage')
        .mockImplementation(() => Promise.resolve(image));

      expect(await repository.createImage(1, "dylpickles-image-bucket", "test.jpg")).toBe(image)
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

      expect(await repository.getImage(1)).toEqual(expect.objectContaining(IMAGE))
    });
  });

  describe('@createImageCollection', () => {
    it('should return "Created Image Collection!"', async () => {
      const collection: Image_Collection = {
        collectionID: expect.any(Number),
        parkID: expect.any(Number),
        name: expect.any(String),
        flightID: expect.any(Number),
        upload_date_time: expect.any(String),
        completed: expect.any(Boolean)
      }

      jest
        .spyOn(repository, 'createImageCollection')
        .mockImplementation(() => Promise.resolve(collection));

      expect(await repository.createImageCollection(1, "CollectionName", 1)).toBe(collection)
    })
  });

  describe('@createImageCollection', () => {
    it('should return created image collection object', async () => {
      const imageCol: Image_Collection = {
        collectionID: expect.any(Number),
        parkID: expect.any(Number),
        name: expect.any(String),
        flightID: expect.any(Number),
        upload_date_time: expect.any(String),
        completed: expect.any(Boolean)
      }

      jest
        .spyOn(repository, 'createImageCollection')
        .mockImplementation(() => Promise.resolve(imageCol));

      expect(await repository.createImageCollection(-1, "", 2121212)).toBe(imageCol);
    })
  });

});
