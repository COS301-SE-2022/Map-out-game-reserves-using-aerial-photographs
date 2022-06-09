import { Injectable } from '@nestjs/common';
import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import dotenv = require('dotenv');
import { Image_Collection, Prisma } from '@prisma/client';

dotenv.config();
@Injectable()
export class S3UploadRepository {
  constructor(private prisma: PrismaService) { }

  public async createFlight(pilotID: number, height: number, type: string) {
    return this.prisma.flight_Details.create({
      data: {
        flight_height: height,
        flight_type: type,
        pilotID: pilotID
      }
    });
  }

  public async getParkId(name: string) {
    return this.prisma.game_Park.findFirst({
      where: {
        park_name: {
          contains: name
        }
      },
    });
  }

  public async createImage(
    collectionID: number,
    bucket_name: string,
    file_name: string,
  ) {
    return this.prisma.images.create({
      data: {
        collectionID: collectionID,
        bucket_name: bucket_name,
        file_name: file_name,
      },
    });
  }

  public async getImage(imageID: number) {
    return this.prisma.images.findFirst({
      select: {
        imageID: true,
        collectionID: true,
        bucket_name: true,
        file_name: true,
      },
      where: {
        imageID: imageID,
      },
    });
  }

  public async getCatalogues() {
    return this.prisma.image_Collection.findMany({});
  }

  public async getImagesByCollectionId(id: number) {
    return this.prisma.images.findMany({
      where: {
        collectionID: id,
      },
    });
  }

  public async createImageCollection(
    parkID: number,
    name: string,
    flightID: number
  ): Promise<Image_Collection|null> {
    return this.prisma.image_Collection.create({
      data: {
        parkID: parkID,
        name: name,
        flightID: flightID,
      },
    });
  }
}
