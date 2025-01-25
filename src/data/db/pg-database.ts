import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/user.model";

interface Options {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export class PostgresDatabase {
  private static dataSource: DataSource | null = null;

  static async connect(options: Options) {
    const { host, port, username, password, database } = options;

    // Configurar la conexión a PostgreSQL usando TypeORM
    this.dataSource = new DataSource({
      type: "postgres",
      host,
      port,
      username,
      password,
      database,
      synchronize: false,
      logging: false,
      entities: [User],
    });

    await this.dataSource.initialize();

  }

  static getDataSource(): DataSource {
    if (!this.dataSource) {
      throw new Error("Database not connected. Call `connect()` first.");
    }
    return this.dataSource;
  }
}

