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
    it('should return "Created user!"', async () => {
      const user = {
        userID: expect.any(Number),
        user_email: expect.any(String),
        user_password: expect.any(String),
        user_password_salt: expect.any(String),
        user_name: expect.any(String),
        user_role: expect.any(String),
        user_approved: expect.any(Boolean)
      }

      jest
        .spyOn(repository, 'createUser')
        .mockImplementation(() => Promise.resolve(user));

      expect(await repository.createUser("Dylan Smith", "email@email.com", "sdazdf", "user", true)).toBe(user);
    })
  });

  describe('@invite', () => {
    it('should return "Created invite!"', async () => {
      jest
        .spyOn(repository, 'invite')
        .mockImplementation(() => Promise.resolve("Created invite!"));

      expect(await repository.invite("example@email.com")).toBe("Created invite!")
    })
  });

  describe('@removePendingInvite', () => {
    it('should return true', async () => {
      jest
        .spyOn(repository, 'removePendingInvite')
        .mockImplementation(() => Promise.resolve(true));

      expect(await repository.removePendingInvite("example@email.com")).toBe(true)
    })
  });

});
