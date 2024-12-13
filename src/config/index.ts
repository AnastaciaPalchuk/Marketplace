import { env } from "process";
import * as dotenv from "dotenv";
dotenv.config();

export = {
  server: {
    port: env.WEB_PORT,
  },
  redis: {
    port: Number(env.REDIS_PORT),
    host: env.REDIS_HOST
  },
  mailgun: {
    key: env.API_KEY,
    domain: env.DOMAIN,
    sender: env.EMAIL,
  },
  jwt: {
    token: String(env.TOKEN_KEY)
  },
  aws: {
    accessKeyId: env.ACCESS_KEY_ID,
    secretAccessKey: env.SECRET_ACCESS_KEY,
    bucketName: env.BUCKET_NAME,
    photoFolder: env.USER_PHOTO_FOLDER,
  }
};
