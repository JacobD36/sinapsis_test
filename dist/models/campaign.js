"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const user_1 = __importDefault(require("./user"));
const message_1 = __importDefault(require("./message"));
// Modelo relacionado a las campañas
const Campaign = connection_1.default.define('campania', {
    idCampania: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    },
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_1.default,
            key: 'idUsuario',
        }
    },
    fechaHoraProgramacion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'campania'
});
Campaign.hasMany(message_1.default, { foreignKey: 'idCampania', sourceKey: 'idCampania' });
message_1.default.belongsTo(Campaign, { foreignKey: 'idCampania', targetKey: 'idCampania' });
exports.default = Campaign;
//# sourceMappingURL=campaign.js.map