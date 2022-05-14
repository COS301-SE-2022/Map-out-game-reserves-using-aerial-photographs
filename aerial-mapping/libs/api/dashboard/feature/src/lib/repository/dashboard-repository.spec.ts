/* eslint-disable @typescript-eslint/no-namespace */
import { Test, TestingModule } from '@nestjs/testing';
import { DashboardRepository } from './dashboard-repository';
import { PrismaService } from "../../../../../shared/services/prisma/data-access/src/index";
import { User, Video_Collection } from '@prisma/client';

describe('DashboardRepository', () => {
    let repository: DashboardRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DashboardRepository, PrismaService]
        }).compile();

        repository = module.get<DashboardRepository>(DashboardRepository);
    });

    it('Should be defined', async () => {
        expect(repository).toBeDefined();
    });

    describe('@getAllUsers', () => {
      const userArr = [
        {
          userID: expect.any(Number),
          user_email: expect.any(String),
          user_password: expect.any(String),
          user_password_salt: expect.any(String),
          user_name: expect.any(String),
          user_surname: expect.any(String),
          user_role: expect.any(String),
          user_approved: expect.any(Boolean),
        }
      ]
      it('should return an array with all the users',async () => {
        // jest
        // .spyOn(repository, 'getAllUsers')
        // .mockImplementation((): Promise<User[]> => Promise.resolve(userArr));

        expect(await repository.getAllUsers()).toEqual(
          expect.objectContaining(userArr)
        )
      })
    });

    describe('@getVideoCollections', () => {
      const collectionArr: Video_Collection[] =[
        {
          collectionID: expect.any(Number),
          parkID: expect.any(Number),
          completed: expect.any(Boolean)
          //upload_date_time: expect.any(String)
        }
      ]

      it('should return an array with all the video collections',async () => {
        jest
        .spyOn(repository, 'getVideoCollections')
        .mockImplementation((): Promise<Video_Collection[]> => Promise.resolve(collectionArr));

        expect(await repository.getVideoCollections()).toEqual(
          expect.objectContaining(collectionArr)
        )
      })
    });

    describe('@getParks', () => {
      const parkArr = [
        {
          parkID: expect.any(Number),
          park_name: expect.any(String),
          park_location: expect.any(String),
          park_address: expect.any(String)
        }
      ]
      it('should return an array with all the parks',async () => {
        // jest
        // .spyOn(repository, 'getParks')
        // .mockImplementation((): Promise<Game_Park[]> => Promise.resolve(parkArr));

        expect(await repository.getParks()).toEqual(
          expect.objectContaining(parkArr)
        )
      })
    });

    describe('@getNumOfVidsPerDate', () => {

      it('should return the number of videos for a provided date',async () => {
        // jest
        // .spyOn(repository, 'getNumOfVidsPerDate')
        // .mockImplementation((): Promise<number> => Promise.resolve(parkArr));

        expect(await repository.getNumOfVidsPerDate()).toEqual(
          expect.any(Number)
        )
      })
    });

    describe('@getMessages', () => {
      const msgArr = [
        {
          messageID: expect.any(Number),
          message_status: expect.any(String),
          message_description: expect.any(String),
          collectionID: expect.any(Number),
        }
      ]
      it('should return an array with all the messages',async () => {
        // jest
        // .spyOn(repository, 'getMessages')
        // .mockImplementation((): Promise<Message[]> => Promise.resolve(msgArr));

        expect(await repository.getMessages()).toEqual(
          expect.objectContaining(msgArr)
        )
      })
    });

    describe('@createUser', () => {
      it('should return "Created User!"',async () => {
        jest
        .spyOn(repository, 'createUser')
        .mockImplementation((fn: string, ln: string, email: string, hashed: string, salt: string, role: string, approved: boolean) => Promise.resolve("Created User!"));

        expect(await repository.createUser("Dylan", "Smith", "email@email.com", "sdazdf", "4rr", "user", true)).toBe("Created User!")
      })
    });

    describe('@createVideoCollection', () => {
      it('should return "Created Video Collection!"',async () => {
        jest
        .spyOn(repository, 'createVideoCollection')
        .mockImplementation((parkID: number) => Promise.resolve("Created Video Collection!"));

        expect(await repository.createVideoCollection(1)).toBe("Created Video Collection!")
      })
    });
});
