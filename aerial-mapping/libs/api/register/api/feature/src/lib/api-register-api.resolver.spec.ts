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

  describe('@invite', () => {
    it('should return "Created invite!"',async () => {
      jest
      .spyOn(resolver, 'invite')
      .mockImplementation(() => Promise.resolve("Created invite!"));

      expect(await resolver.invite("email@email.com")).toBe("Created invite!")
    })
  });

  describe('@registerUser', () => {
    it('should return "Created user!"',async () => {
      jest
      .spyOn(resolver, 'registerUser')
      .mockImplementation(() => Promise.resolve("Created user!"));

      expect(await resolver.registerUser("Dylan Smith", "email@email.com", "sdazdf", "user", true)).toBe("Created user!")
    })
  });

});

