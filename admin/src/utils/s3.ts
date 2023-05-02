import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { env } from "~/env.mjs";

const client = new S3Client({
  region: env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: env.AWS_PUBLIC_KEY,
    secretAccessKey: env.AWS_SECRET_KEY,
  },
});

async function getFileViewLink(key: string, expiresInSeconds = 300) {
  const command = new GetObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: key,
  });

  const signedUrl = await getSignedUrl(client, command, {
    expiresIn: expiresInSeconds,
  });

  if (signedUrl === null) {
    throw new Error("Unable to get signed URL");
  }

  return signedUrl;
}

export { getFileViewLink };
