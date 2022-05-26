//Code that connects to AWS and s3 bucket and handles generation of s3 secure url
import dotenv from 'dotenv';
import AWS from 'aws-sdk';

//Libraries for obscuring imagename to make secure URL
import { randomBytes } from 'crypto';

dotenv.config();

const region = "eu-west-2";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName ="dylpickles-s3-aerialmapping";

//Creates new S3-bucket object to into bucket
const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

export async function generateUploadURL(){
  const rawBytes = await randomBytes(16);
  const toHex = rawBytes.toString('hex');
  const imageName = toHex+'.png';

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })

  const uploadURL = s3.getSignedUrlPromise('putObject',params);
  return uploadURL;
}
