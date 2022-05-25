import { Injectable } from "@nestjs/common";
import { PrismaService } from "@aerial-mapping/api/shared/services/prisma/data-access";
import { Game_Park, User, Video_Collection, Message, Prisma } from "@prisma/client";

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

  public async getVideoCollections(): Promise<Video_Collection[]|null> {
    return this.prisma.video_Collection.findMany({})
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

  public async getNumOfVidsPerDate(): Promise<number> {
    const arr = await this.prisma.video.findMany({
      select: {
        filmed_date_time: true
      }
    })

    return new Promise((resolve, reject) => {
      let count = 0;
      arr.forEach(element => {
        count++
      })
      resolve(count);
    })
  }

  public async getMessages(): Promise<Message[]|null> {
    return this.prisma.message.findMany({})
  }

  public async createUser(firstname: string, lastname: string, email: string, hashedPassword: string, salt: string, role: string, approved: boolean) {
    //validation
    const x = await this.prisma.user.create({
      data: {
        user_name: firstname,
        user_surname: lastname,
        user_email: email,
        user_password: hashedPassword,
        user_password_salt: salt,
        user_role: role,
        user_approved: approved
      }
    });
    return "Created User!";
  }

  //public async login

  public async createVideoCollection(parkID: number, dateTime: string) {
    //validation
    try {
      const x = await this.prisma.video_Collection.create({
        data: {
          parkID: parkID,
          upload_date_time: dateTime
        }
      });
      return "Created Video Collection!";
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
