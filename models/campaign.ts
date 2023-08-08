import { DataTypes } from 'sequelize';
import db from '../database/connection';
import User from './user';
import Message from './message';

// Modelo relacionado a las campañas
const Campaign = db.define('campania' , {
    idCampania: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'idUsuario',
        }
    },
    fechaHoraProgramacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'campania'
});

Campaign.hasMany(Message, { foreignKey: 'idCampania', sourceKey: 'idCampania'});
Message.belongsTo(Campaign, { foreignKey: 'idCampania', targetKey: 'idCampania'});

export default Campaign;