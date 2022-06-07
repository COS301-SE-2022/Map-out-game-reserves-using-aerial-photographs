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

  describe('@S3Upload', () => {
    it('should return "Success!"', async () => {
      jest
        .spyOn(resolver, 'S3Upload')
        .mockImplementation(() => Promise.resolve('Success!'));

      expect(await resolver.S3Upload("dylpickles-image-bucket/test.jpg")).toBe("Success!")
    })
  });

  describe('@S3Download', () => {
    it('should return a path', async () => {
      jest
        .spyOn(resolver, 'S3Upload')
        .mockImplementation(() => Promise.resolve('dylpickles-image-bucket/test.jpg'));

      expect(await resolver.S3Upload("dylpickles-image-bucket/test.jpg")).toBe("dylpickles-image-bucket/test.jpg")
    })
  });

  describe('@createImageCollection', () => {
    it('should return "Created Image Collection!"',async () => {
      jest
      .spyOn(resolver, 'createImageCollection')
      .mockImplementation(() => Promise.resolve("Created Image Collection!"));

      expect(await resolver.createImageCollection(1, new Date().toISOString(),1)).toBe("Created Image Collection!")
    })

    it('should return "There is a foreign key constraint violation"',async () => {
      jest
      .spyOn(resolver, 'createImageCollection')
      .mockImplementation(() => Promise.resolve("There is a foreign key constraint violation"));

      expect(await resolver.createImageCollection(-1, "",-1)).toBe("There is a foreign key constraint violation")
    })
  });
});

