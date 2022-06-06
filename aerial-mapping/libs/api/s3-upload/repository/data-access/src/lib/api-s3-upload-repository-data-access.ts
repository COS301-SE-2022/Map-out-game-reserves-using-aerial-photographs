import { Injectable } from "@nestjs/common";
import { PrismaService } from "@aerial-mapping/api/shared/services/prisma/data-access";
import dotenv=require('dotenv');
import aws=require('aws-sdk');
import { randomBytes } from 'crypto';

dotenv.config();

const region = "eu-west-2";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName ="dylpickles-s3-aerialmapping";

@Injectable()
export class S3UploadRepository {
  constructor(private prisma: PrismaService) {}

//Creates new S3-bucket object to into bucket
s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

generateUploadURL(){
  const rawBytes = randomBytes(16);
  const toHex = rawBytes.toString('hex');
  const imageName = toHex+'.png';

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })

  const uploadURL = this.s3.getSignedUrlPromise('putObject',params);
  return uploadURL;
}
  //interact with the db here (e.g. this.prisma.users.find....)

  //Below was in express.js file
/*   app.get('/', async (req,res)=> {
    const url = await generateUploadURL();
    res.send({url});
    console.log(url);
  })
 */
  public async S3Upload(path: string) {
    //add path to db
    await this.prisma.images.create({
      data: {
        videoID: 1,
        file_location: path,
        imagescol: ""
      }
    })

    return "Success!";
  }

  public async S3Download(path: string) {
    //add path to db
    const image = await this.prisma.images.findFirst({
      select: {
        imageID: true,
        videoID: true,
        file_location: true,
        imagescol: true
      },
      where: {
        file_location: path
      }
    })

    return image;
  }

}
