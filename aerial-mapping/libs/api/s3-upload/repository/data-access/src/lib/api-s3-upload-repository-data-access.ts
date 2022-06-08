import { Injectable } from '@nestjs/common';
import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import dotenv = require('dotenv');
import aws = require('aws-sdk');
import { Prisma } from '@prisma/client';
import { randomBytes } from 'crypto';

dotenv.config();

const region = 'us-east-1';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = 'dylpickles-s3-aerialmapping';

@Injectable()
export class S3UploadRepository {
  constructor(private prisma: PrismaService) {}

  public async createImage(
    collectionId: number,
    bucket_name: string,
    file_name: string,
  ) {
    await this.prisma.images.create({
      data: {
        collectionID: collectionId,
        bucket_name: bucket_name,
        file_name: file_name,
      },
    });
    return 'Success!';
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
    dateTime: string,
    completed: boolean,
    flightID: number
  ) {
    //validation
    try {
      await this.prisma.image_Collection.create({
        data: {
          parkID: parkID,
          name: name,
          upload_date_time: dateTime,
          completed: completed,
          flightID: flightID,
        },
      });
      return 'Created Image Collection!';
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          return 'There is a unique constraint violation';
        } else if (e.code === 'P2003') {
          return 'There is a foreign key constraint violation';
        }
      }
      return 'Prisma error';
    }
  }
}
