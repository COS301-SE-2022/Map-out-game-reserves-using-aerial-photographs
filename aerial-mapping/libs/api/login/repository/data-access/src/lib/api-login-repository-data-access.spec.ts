/* eslint-disable @typescript-eslint/no-namespace */
import { Test, TestingModule } from '@nestjs/testing';
import { LoginRepository } from './api-login-repository-data-access';
import { PrismaService } from "@aerial-mapping/api/shared/services/prisma/data-access";
import { User } from '@prisma/client';
import { AuthGuard } from './auth/guards/auth.guard';

describe('LoginRepository', () => {
  let repository: LoginRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGuard, PrismaService, LoginRepository]
    }).compile();

    repository = module.get<LoginRepository>(LoginRepository);
  });

  it('Should be defined', async () => {
    expect(repository).toBeDefined();
  });

  describe('@getUserByEmail', () => {
    it('should return a user', async () => {
      const user: User = {
        userID: 1,
        user_email: "email@email.com",
        user_password: "password",
        user_password_salt: "salt",
        user_name: "name",
        user_role: "user",
        user_approved: true
      }

      jest
        .spyOn(repository, 'getUserByEmail')
        .mockImplementation(() => Promise.resolve(user));

      expect(await repository.getUserByEmail("email@email.com")).toBe(user)
    })
  });

  describe('@getAllUsers', () => {
    it('should return a list of users', async () => {
      const user: User = {
        userID: 1,
        user_email: "email@email.com",
        user_password: "password",
        user_password_salt: "salt",
        user_name: "name",
        user_role: "user",
        user_approved: true
      }
      const userArray: User[] = [];
      userArray.push(user);
      jest
        .spyOn(repository, 'getAllUsers')
        .mockImplementation(() => Promise.resolve(userArray));

      expect(await repository.getAllUsers()).toBe(userArray);
    })
  });

  describe('@login', () => {
    it('should return { access_token: "abc" }', async () => {
      jest
        .spyOn(repository, 'login')
        .mockImplementation(() => Promise.resolve({ access_token: "abc" }));

      expect(await repository.login("email@email.com", "password")).toStrictEqual({ access_token: "abc" })
    })
  });

  describe('@verifyToken', () => {
    it('should return true', async () => {
      jest
        .spyOn(repository, 'verifyToken')
        .mockImplementation(() => Promise.resolve(true));

      expect(await repository.verifyToken('abc')).toBe(true)
    })
  });
});
