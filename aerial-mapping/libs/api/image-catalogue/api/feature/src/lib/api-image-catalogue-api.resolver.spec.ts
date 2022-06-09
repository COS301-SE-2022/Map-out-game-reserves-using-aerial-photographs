import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { Test, TestingModule } from '@nestjs/testing';
import { ImageCatalogueRepository } from "@aerial-mapping/api/s3-upload/repository/data-access";
import { ImageCatalogueResolver } from './api-image-catalogue-api.resolver';

//Run 'yarn nx test api-ImageCatalogue'
describe('ImageCatalogueResolver', () => {
  let resolver: ImageCatalogueResolver;

  beforeEach(async () => {
    const module: TestingModule =
     await Test.createTestingModule({
      imports: [],
      providers: [PrismaService, ImageCatalogueResolver, ImageCatalogueRepository],
    }).compile();

    resolver = module.get<ImageCatalogueResolver>(ImageCatalogueResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  // describe('@createImageCollection', () => {
  //   it('should return "Created Image Collection!"',async () => {
  //     jest
  //     .spyOn(resolver, 'createImageCollection')
  //     .mockImplementation(() => Promise.resolve("Created Image Collection!"));

  //     expect(await resolver.createImageCollection(1, "", new Date().toISOString(), false,1)).toBe("Created Image Collection!")
  //   })

  //   it('should return "There is a foreign key constraint violation"',async () => {
  //     jest
  //     .spyOn(resolver, 'createImageCollection')
  //     .mockImplementation(() => Promise.resolve("There is a foreign key constraint violation"));

  //     expect(await resolver.createImageCollection(-1, "","",false,-1)).toBe("There is a foreign key constraint violation")
  //   })
  // });

});

