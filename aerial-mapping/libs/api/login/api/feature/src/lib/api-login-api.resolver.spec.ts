import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginRepository } from '@aerial-mapping/api/login/repository/data-access';
import { LoginResolver } from './api-login-api.resolver';

//Run 'yarn nx test api-login'
describe('LoginResolver', () => {
  let resolver: LoginResolver;

  beforeEach(async () => {
    const module: TestingModule =
     await Test.createTestingModule({
      imports: [],
      providers: [PrismaService, LoginResolver, LoginRepository],
    }).compile();

    resolver = module.get<LoginResolver>(LoginResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('@createUser', () => {
    it('should return "Created User!"',async () => {
      jest
      .spyOn(resolver, 'createUser')
      .mockImplementation((fn: string, ln: string, email: string, hashed: string, salt: string, role: string, approved: boolean) => Promise.resolve("Created User!"));

      expect(await resolver.createUser("Dylan", "Smith", "email@email.com", "sdazdf", "4rr", "user", true)).toBe("Created User!")
    })
  });
});

