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
}
