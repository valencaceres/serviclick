import "dotenv/config";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY!,
    secretAccessKey: AWS_SECRET_KEY!,
  },
});

async function uploadFile(file: any) {
  const stream = fs.createReadStream(file.tempFilePath);

  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: file.name,
    Body: stream,
    ContentType: file.mimetype,
    ContentDisposition: "inline",
  };
  const command = new PutObjectCommand(uploadParams);

  return await client.send(command);
}

async function getFileViewLink(key: string, expiresInSeconds: number = 300) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(client, command, {
    expiresIn: expiresInSeconds,
  });
}

export { uploadFile, getFileViewLink };
