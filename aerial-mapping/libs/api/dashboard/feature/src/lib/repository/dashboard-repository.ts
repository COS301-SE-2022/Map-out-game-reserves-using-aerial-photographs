import { Injectable } from "@nestjs/common";
import { PrismaService } from "@aerial-mapping/api/shared/services/prisma/data-access";
import { User, Video_Collection } from "@prisma/client";

@Injectable()
export class DashboardRepository {
  constructor(private prisma: PrismaService) {}

  public async getAllSets(): Promise<User|null> {
    return this.prisma.user.findFirst({
      where: {
        userID: 2
      }
    });
  }

  public async getVideoCollections(): Promise<Video_Collection[]|null> {
    return this.prisma.video_Collection.findMany({})
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

  public async login

  public async createVideoCollection(parkID: number) {
    //validation
    const x = await this.prisma.video_Collection.create({
      data: {
        parkID: parkID
      }
    });
    return "Created Video Collection!";
  }
}
