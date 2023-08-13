import { Sequelize } from "sequelize-typescript";
import * as models from "./models/index";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      storage: ":memory:",
      models: Object.values(models),
      logging: false,
      native: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize({
      dialect: "postgres",
      database: process.env.DB_NAME,
      password: process.env.PASSWORD,
      username: process.env.USER_NAME,
      storage: ":memory:",
      models: Object.values(models),
    });
