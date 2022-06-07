import { Injectable } from "@nestjs/common";
import { PrismaService } from "@aerial-mapping/api/shared/services/prisma/data-access";
import { Game_Park, User, Image_Collection, Message, Prisma } from "@prisma/client";

@Injectable()
export class DashboardRepository {
  constructor(private prisma: PrismaService) {}

  public async getAllUsers(): Promise<User[]|null> {
    return this.prisma.user.findMany({
      select: {
        userID: true,
        user_email: true,
        user_name: true,
        user_surname: true,
        user_role: true,
        user_approved: true,
        user_password: true,
        user_password_salt: true
      }
    });
  }

  public async getImageCollections(): Promise<Image_Collection[]|null> {
    return this.prisma.image_Collection.findMany({
      select: {
        collectionID: true,
        parkID: true,
        name: true,
        upload_date_time: true,
        completed: true,
        flightID: true
      }
    })
  }

  public async getParks(): Promise<Game_Park[]|null> {
    return this.prisma.game_Park.findMany({
      select: {
        parkID: true,
        park_name: true,
        park_location: true,
        park_address: true
      }
    })
  }

  public async getMessages(): Promise<Message[]|null> {
    return this.prisma.message.findMany({})
  }

  public async createImageCollection(parkID: number, name: string, dateTime: string, completed: boolean, flightID: number) {
    try {
      await this.prisma.image_Collection.create({
        data: {
          parkID: parkID,
          name: name,
          upload_date_time: dateTime,
          completed: completed,
          flightID: flightID
        }
      });
      return "Created Image Collection!";
    }
    catch(e) {
      if(e instanceof Prisma.PrismaClientKnownRequestError) {
        if(e.code === 'P2002') {
          return "There is a unique constraint violation";
        }
        else if (e.code === 'P2003') {
          return "There is a foreign key constraint violation";
        }
      }
      return "Prisma error";
    }
  }
}
