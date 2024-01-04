import "dotenv/config";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";

const AWS_BUCKET_OPERATIONS = process.env.AWS_BUCKET_OPERATIONS;
const AWS_BUCKET_CONTRACTS = process.env.AWS_BUCKET_CONTRACTS;
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
    Bucket: AWS_BUCKET_OPERATIONS,
    Key: file.name,
    Body: stream,
    ContentType: file.mimetype,
    ContentDisposition: "inline",
  };
  const command = new PutObjectCommand(uploadParams);

  return await client.send(command);
}

async function fileExists(key: string, bucket: string) {
  try {
    await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return true;
  } catch (error: any) {
    if (error.code === "NotFound") {
      return false
    }

    throw error
  }
}

async function getFileViewLink(key: string, expiresInSeconds: number = 300) {
  const exists = await fileExists(key, AWS_BUCKET_OPERATIONS as string)

  if (!exists) {
    throw new Error("File not found")
  }

  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_OPERATIONS,
    Key: key,
  });

  return await getSignedUrl(client, command, {
    expiresIn: expiresInSeconds,
  });
}

async function getContractLink(key: string, expiresInSeconds: number = 300) {
  const exists = await fileExists(key, AWS_BUCKET_CONTRACTS as string)

  if (!exists) {
    throw new Error("File not found")
  }

  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_CONTRACTS,
    Key: key,
  })

  return await getSignedUrl(client, command, {
    expiresIn: expiresInSeconds,
  })
}

export { uploadFile, getFileViewLink, getContractLink };
