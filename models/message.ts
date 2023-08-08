import { DataTypes } from 'sequelize';
import db from '../database/connection';

// Modelo relacionado a los mensajes
const Message = db.define('mensaje', {
    idMensaje: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCampania: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'campania',
            key: 'idCampania',
        }
    },
    estadoEnvio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '1: Pendiente, 2: Enviado, 3: Error',
    },
    fechaHoraEnvio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    mensaje: {
        type: DataTypes.STRING(160),
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'mensaje'
});

export default Message;