import { injectable } from "inversify";
import config from "../config/index";
import { DataSource, Repository, ObjectLiteral, EntityTarget } from "typeorm";

@injectable()
export class Database {
  private readonly dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: "postgres",
      host: config.database.host,
      port: config.database.database_port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database_name,
      entities: [__dirname + '/../**/*Entity.{js,ts}'],
    })
  };

    connect = async () => {
      try {
        await this.dataSource.initialize();
        console.log("Data Source has been initialized!");
      } catch (error) {
        console.error("Error during Data Source initialization", error);
        return;
      }
    };

    getRepository<Entity extends ObjectLiteral>(entity: EntityTarget<Entity>): Repository<Entity> {
      return this.dataSource.getRepository(entity);
  }
}

