"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_NAME, USER_NAME, PASSWORD, DATABASE_URL } = process.env;
exports.sequelize = DATABASE_URL
    ? new sequelize_typescript_1.Sequelize(DATABASE_URL, {
        storage: ":memory:",
        models: [__dirname + "/models"],
        logging: false,
        native: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    })
    : new sequelize_typescript_1.Sequelize({
        dialect: "postgres",
        database: DB_NAME,
        password: PASSWORD,
        username: USER_NAME,
        storage: ":memory:",
        models: [__dirname + "/models"],
    });
