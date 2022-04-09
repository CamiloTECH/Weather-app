import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const { DB_NAME, USER_NAME, PASSWORD } = process.env;

export const sequelize = new Sequelize({
  dialect: "postgres",
  database: DB_NAME,
  password: PASSWORD,
  username: USER_NAME,
  storage: ":memory:",
  models: [__dirname + "/models"],
});
