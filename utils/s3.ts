import "dotenv/config";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";

const S3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
  },
  region: process.env.AWS_REGION
});

const storage = multerS3({
  s3: S3,
  bucket: "turjum"
});

export default storage;
