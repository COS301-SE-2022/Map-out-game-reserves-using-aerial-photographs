/* eslint-disable @typescript-eslint/no-namespace */
import { Test, TestingModule } from '@nestjs/testing';
import { LoginRepository } from './api-login-repository-data-access';
import { PrismaService } from "@aerial-mapping/api/shared/services/prisma/data-access";

describe('LoginRepository', () => {
  let repository: LoginRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginRepository, PrismaService]
    }).compile();

    repository = module.get<LoginRepository>(LoginRepository);
  });

  it('Should be defined', async () => {
    expect(repository).toBeDefined();
  });

  describe('@createUser', () => {
    it('should return "Created User!"', async () => {
      jest
        .spyOn(repository, 'createUser')
        .mockImplementation(() => Promise.resolve("Created User!"));

      expect(await repository.createUser("Dylan", "Smith", "email@email.com", "sdazdf", "4rr", "user", true)).toBe("Created User!")
    })
  });

});
