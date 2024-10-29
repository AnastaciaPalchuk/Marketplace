import { env } from "process";
import * as dotenv from "dotenv";
dotenv.config();

export = {
  server: {
    port: env.WEB_PORT,
  },
  database: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database_name: env.DATABASE,
    host: env.HOST,
    database_port: Number(env.DATABASE_PORT),
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
  }

};
