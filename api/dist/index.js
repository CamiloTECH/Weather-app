"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const db_1 = require("./src/db");
db_1.sequelize.sync({ force: false, logging: false })
    .then(() => {
    console.log("Base de datos conectada");
    app_1.default.listen(process.env.PORT, () => console.log("Escuchando en " + process.env.PORT));
})
    .catch((err) => console.log(err));
