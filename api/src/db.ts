import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const { DB_NAME, USER_NAME, PASSWORD, DATABASE_URL } = process.env;

export const sequelize = !DATABASE_URL
  ? new Sequelize({
      dialect: "postgres",
      database: DB_NAME,
      password: PASSWORD,
      username: USER_NAME,
      storage: ":memory:",
      models: [__dirname + "/models"],
    })
  : new Sequelize(DATABASE_URL, {
      storage: ":memory:",
      models: [__dirname + "/models"],
      logging: false,
      native: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
        keepAlive: true,
      },
      ssl: true,
    });
