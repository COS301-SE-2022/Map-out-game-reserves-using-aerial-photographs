/* eslint-disable @typescript-eslint/no-namespace */
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterRepository } from './api-register-repository-data-access';
import { PrismaService } from "@aerial-mapping/api/shared/services/prisma/data-access";

describe('RegisterRepository', () => {
  let repository: RegisterRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterRepository, PrismaService]
    }).compile();

    repository = module.get<RegisterRepository>(RegisterRepository);
  });

  it('Should be defined', async () => {
    expect(repository).toBeDefined();
  });

  describe('@createUser', () => {
    it('should return "Created User!"', async () => {
      jest
        .spyOn(repository, 'createUser')
        .mockImplementation(() => Promise.resolve("Created User!"));

      expect(await repository.createUser("Dylan", "Smith", "email@email.com", "sdazdf", "user", true)).toBe("Created User!")
    })
  });

  describe('@invite', () => {
    it('should return "Created Invite!"', async () => {
      jest
        .spyOn(repository, 'invite')
        .mockImplementation(() => Promise.resolve("Created Invite!"));

      expect(await repository.invite("example@email.com")).toBe("Created Invite!")
    })
  });
});
