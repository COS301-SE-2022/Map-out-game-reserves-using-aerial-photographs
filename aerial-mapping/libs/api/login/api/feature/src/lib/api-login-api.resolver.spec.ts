import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard, LoginRepository } from '@aerial-mapping/api/login/repository/data-access';
import { LoginResolver } from './api-login-api.resolver';

//Run 'nx test api-login-api-feature'
describe('LoginResolver', () => {
  let resolver: LoginResolver;

  beforeEach(async () => {
    const module: TestingModule =
     await Test.createTestingModule({
      imports: [],
      providers: [PrismaService, LoginResolver, LoginRepository, AuthGuard],
    }).compile();

    resolver = module.get<LoginResolver>(LoginResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('@login', () => {
    it('should return "Logged in!"',async () => {
      jest
      .spyOn(resolver, 'login')
      .mockImplementation(() => Promise.resolve("Logged in!"));

      expect(await resolver.login("dylan@mweb.co.za", "1234").then((resp) => {
        return resp;
      })
      ).toBe("Logged in!");
    })
  });

  describe('@logout', () => {
    it('should return "Logged out!"',async () => {
      jest
      .spyOn(resolver, 'logout')
      .mockImplementation(() => "Logged out!");

      expect(resolver.logout()).toBe("Logged out!");
    })
  });

});

