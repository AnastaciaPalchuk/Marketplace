import { Client } from "pg";
import * as dotenv from "dotenv";
dotenv.config();
import config from "../config/index";
import { injectable } from "inversify";

@injectable()
export class Database {
  private readonly client: Client;
  constructor() {
    this.client = new Client({
      user: config.database.username,
      password: config.database.password,
      database: config.database.database_name,
      host: config.database.host,
      port: config.database.database_port,
    });
  }

  async connect() {
    await this.client.connect();
  }

  async query(sql: string, replacements: any[]) {
    return this.client.query(sql, replacements);
  }

}
export default new Database();