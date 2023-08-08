"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
// Modelo relacionado a los mensajes
const Message = connection_1.default.define('mensaje', {
    idMensaje: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCampania: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'campania',
            key: 'idCampania',
        }
    },
    estadoEnvio: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '1: Pendiente, 2: Enviado, 3: Error',
    },
    fechaHoraEnvio: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    mensaje: {
        type: sequelize_1.DataTypes.STRING(160),
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'mensaje'
});
exports.default = Message;
//# sourceMappingURL=message.js.map