import { Sequelize } from 'sequelize';
import dotenv  from 'dotenv';
dotenv.config();

const MYSQL_USER = process.env.DB_USER || '';
const MYSQL_PASS = process.env.DB_PASS || '';
const MYSQL_HOST = process.env.DB_HOST || 'mysql';

// Se crea una nueva conexión a MySQL
const db = new Sequelize('challenge_db', MYSQL_USER, MYSQL_PASS, {
    host: MYSQL_HOST,
    dialect: 'mysql',
    port: 3306,
    logging: false
});

export default db;