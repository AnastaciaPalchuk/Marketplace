import { injectable } from "inversify";
import { Sequelize } from "sequelize-typescript";
import sequelize from "../config/sequelize";

@injectable()
export class Database {
  private readonly sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({ dialect: "postgres",
      host: sequelize.development.host,
      port: sequelize.development.port,
      username: sequelize.development.username,
      password: sequelize.development.password,
      database: sequelize.development.database,
      models: sequelize.development.models,
      timezone: 'UTC'
    });}

    connect = async () => {
      try {
        await this.sequelize.sync();
        console.log("Data Source has been initialized!");
      } catch (error) {
        console.error("Error during Data Source initialization", error);
        return;
      }
    };
  }


