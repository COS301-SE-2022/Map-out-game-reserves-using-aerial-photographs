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

  public async getImageCollection(): Promise<Image_Collection[]|null> {
    return this.prisma.image_Collection.findMany({})
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

  // public async getNumOfVidsPerDate(): Promise<number> {
  //   const arr = await this.prisma.Image.findMany({
  //     select: {
  //       filmed_date_time: true
  //     }
  //   })

  //   return new Promise((resolve, reject) => {
  //     let count = 0;
  //     arr.forEach(element => {
  //       count++
  //     })
  //     resolve(count);
  //   })
  // }

  public async getMessages(): Promise<Message[]|null> {
    return this.prisma.message.findMany({})
  }

  //public async login

  public async createImageCollection(parkID: number, dateTime: string, flightID: number) {
    //validation
    try {
      const x = await this.prisma.image_Collection.create({
        data: {
          parkID: parkID,
          upload_date_time: dateTime,
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
