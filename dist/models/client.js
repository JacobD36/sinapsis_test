"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const user_1 = __importDefault(require("./user"));
// Modelo relacionado a los clientes
const Client = connection_1.default.define('cliente', {
    idCliente: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'cliente'
});
Client.hasMany(user_1.default, { foreignKey: 'idCliente', sourceKey: 'idCliente' });
user_1.default.belongsTo(Client, { foreignKey: 'idCliente', targetKey: 'idCliente' });
exports.default = Client;
//# sourceMappingURL=client.js.map