import { env } from "process";
import 'dotenv/config'
const config = {
    username: env.DATABASE_USERNAME!,
    password: env.DATABASE_PASSWORD!,
    database: env.DATABASE!,
    host: env.HOST!,
    port: Number(env.DATABASE_PORT || 5432),
    dialect: "postgres",
    models: [__dirname + '/../**/*Model.{js,ts}'],
  }
export = {
    development: config,
    test: config,
    production: config
}