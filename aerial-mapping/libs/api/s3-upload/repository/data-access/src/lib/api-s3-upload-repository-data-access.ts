import { Injectable } from "@nestjs/common";
import { PrismaService } from "@aerial-mapping/api/shared/services/prisma/data-access";
import dotenv = require('dotenv');
import aws = require('aws-sdk');
import { randomBytes } from 'crypto';

dotenv.config();

const region = "eu-west-2";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = "dylpickles-s3-aerialmapping";

@Injectable()
export class S3UploadRepository {
  constructor(private prisma: PrismaService) { }

  //Creates new S3-bucket object to into bucket
  s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
  })

  generateUploadURL() {
    const rawBytes = randomBytes(16);
    const toHex = rawBytes.toString('hex');
    const imageName = toHex + '.png';

    const params = ({
      Bucket: bucketName,
      Key: imageName,
      Expires: 60
    })

    const uploadURL = this.s3.getSignedUrlPromise('putObject', params);
    return uploadURL;
  }

  public async S3Upload(collectionId: number, path: string) {
    await this.prisma.images.create({
      data: {
        collectionID: collectionId,
        file_location: path
      }
    })

    return "Success!";
  }

  public async S3Download(path: string) {
    return this.prisma.images.findFirst({
      select: {
        imageID: true,
        collectionID: true,
        file_location: true
      },
      where: {
        file_location: path
      }
    });
  }

  public async getCatalogues() {
    return this.prisma.image_Collection.findMany({
      select: {
        collectionID: true,
        parkID: true,
        upload_date_time: true,
        completed: true,
        flightID: true
      }
    });
  }

}
