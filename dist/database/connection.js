"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MYSQL_USER = process.env.DB_USER || '';
const MYSQL_PASS = process.env.DB_PASS || '';
const MYSQL_HOST = process.env.DB_HOST || 'mysql';
// Se crea una nueva conexión a MySQL
const db = new sequelize_1.Sequelize('challenge_db', MYSQL_USER, MYSQL_PASS, {
    host: MYSQL_HOST,
    dialect: 'mysql',
    port: 3306,
    logging: false
});
exports.default = db;
//# sourceMappingURL=connection.js.map