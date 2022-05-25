import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { Test, TestingModule } from '@nestjs/testing';
import { DashboardRepository } from '@aerial-mapping/api/dashboard/repository/data-access';
import { DashboardResolver } from './api-dashboard-api.resolver';
import { Game_Park, Message, User, Video_Collection } from '@prisma/client';

//Run 'yarn nx test api-dashboard'
describe('DashboardResolver', () => {
  let resolver: DashboardResolver;

  beforeEach(async () => {
    const module: TestingModule =
     await Test.createTestingModule({
      imports: [],
      providers: [DashboardResolver, DashboardRepository, PrismaService],
    }).compile();

    resolver = module.get<DashboardResolver>(DashboardResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('@getUsers', () => {
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
      jest
        .spyOn(resolver, 'getUsers')
        .mockImplementation((): Promise<User[]> => Promise.resolve(userArr));

      expect(await resolver.getUsers()).toEqual(
        expect.objectContaining(userArr)
      )
    })
  });

  describe('@getVideoCollections', () => {
    const collectionArr: Video_Collection[] =[
      {
        collectionID: expect.any(Number),
        parkID: expect.any(Number),
        completed: expect.any(Boolean),
        upload_date_time: expect.any(String)
      }
    ]

    it('should return an array with all the video collections',async () => {
      jest
      .spyOn(resolver, 'getVideoCollections')
      .mockImplementation((): Promise<Video_Collection[]> => Promise.resolve(collectionArr));

      expect(await resolver.getVideoCollections()).toEqual(
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
      jest
        .spyOn(resolver, 'getParks')
        .mockImplementation((): Promise<Game_Park[]> => Promise.resolve(parkArr));

      expect(await resolver.getParks()).toEqual(
        expect.objectContaining(parkArr)
      )
    })
  });

  describe('@getNumOfVidsPerDate', () => {
    it('should return the number of videos for a provided date',async () => {
      jest
        .spyOn(resolver, 'getNumOfVidsPerDate')
        .mockImplementation((): Promise<number> => Promise.resolve(3));

      expect(await resolver.getNumOfVidsPerDate()).toEqual(
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
      jest
        .spyOn(resolver, 'getMessages')
        .mockImplementation((): Promise<Message[]> => Promise.resolve(msgArr));

      expect(await resolver.getMessages()).toEqual(
        expect.objectContaining(msgArr)
      )
    })
  });

  describe('@createVideoCollection', () => {
    it('should return "Created Video Collection!"',async () => {
      jest
      .spyOn(resolver, 'createVideoCollection')
      .mockImplementation((parkID: number, dateTime: string) => Promise.resolve("Created Video Collection!"));

      expect(await resolver.createVideoCollection(1, new Date().toISOString())).toBe("Created Video Collection!")
    })

    it('should return "There is a foreign key constraint violation"',async () => {
      jest
      .spyOn(resolver, 'createVideoCollection')
      .mockImplementation((parkID: number, dateTime: string) => Promise.resolve("There is a foreign key constraint violation"));

      expect(await resolver.createVideoCollection(-1, "")).toBe("There is a foreign key constraint violation")
    })
  });

});
