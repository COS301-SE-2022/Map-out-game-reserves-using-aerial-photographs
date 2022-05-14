import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginRepository } from '../repository/login-repository';
import { LoginResolver } from './login.resolver';

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
});

