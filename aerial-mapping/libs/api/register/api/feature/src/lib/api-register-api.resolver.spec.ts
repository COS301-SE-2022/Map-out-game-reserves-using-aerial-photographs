import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterRepository } from '@aerial-mapping/api/register/repository/data-access';
import { RegisterResolver } from './api-register-api.resolver';

//Run 'nx test api-register-api-feature'
describe('RegisterResolver', () => {
  let resolver: RegisterResolver;

  beforeEach(async () => {
    const module: TestingModule =
     await Test.createTestingModule({
      imports: [],
      providers: [PrismaService, RegisterResolver, RegisterRepository],
    }).compile();

    resolver = module.get<RegisterResolver>(RegisterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('@createUser', () => {
    it('should return "Created User!"',async () => {
      jest
      .spyOn(resolver, 'createUser')
      .mockImplementation(() => Promise.resolve("Created User!"));

      expect(await resolver.createUser("Dylan", "Smith", "email@email.com", "sdazdf", "4rr", "user", true)).toBe("Created User!")
    })
  });
});

