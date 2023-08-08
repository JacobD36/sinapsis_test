"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const client_1 = __importDefault(require("./client"));
const campaign_1 = __importDefault(require("./campaign"));
// Modelo relacionado a los usuarios
const User = connection_1.default.define('usuario', {
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCliente: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: client_1.default,
            key: 'idCliente',
        }
    },
    usuario: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'usuario'
});
User.hasMany(campaign_1.default, { foreignKey: 'idUsuario', sourceKey: 'idUsuario' });
campaign_1.default.belongsTo(User, { foreignKey: 'idUsuario', targetKey: 'idUsuario' });
exports.default = User;
//# sourceMappingURL=user.js.map