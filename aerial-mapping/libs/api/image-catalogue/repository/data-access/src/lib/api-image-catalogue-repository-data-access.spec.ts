/* eslint-disable @typescript-eslint/no-namespace */
import { Test, TestingModule } from '@nestjs/testing';
import { ImageCatalogueRepository } from './api-image-catalogue-repository-data-access';
import { PrismaService } from "@aerial-mapping/api/shared/services/prisma/data-access";

describe('ImageCatalogueRepository', () => {
  let repository: ImageCatalogueRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageCatalogueRepository, PrismaService]
    }).compile();

    repository = module.get<ImageCatalogueRepository>(ImageCatalogueRepository);
  });

  it('Should be defined', async () => {
    expect(repository).toBeDefined();
  });


  // describe('@createImageCollection', () => {
  //   it('should return "Created Image Collection!"', async () => {
  //     jest
  //       .spyOn(repository, 'createImageCollection')
  //       .mockImplementation(() => Promise.resolve("There is a foreign key constraint violation"));

  //     expect(await repository.createImageCollection(-1, "", "-1", false, 2121212)).toBe("There is a foreign key constraint violation")
  //   })
  // });

});
