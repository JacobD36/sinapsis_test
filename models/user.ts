import { DataTypes } from 'sequelize';
import db from '../database/connection';
import Client from './client';
import Campaign from './campaign';

// Modelo relacionado a los usuarios
const User = db.define('usuario' ,{
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCliente: {
        type: DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'idCliente',
        }
    },
    usuario: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},{
    tableName: 'usuario'
});

User.hasMany(Campaign, { foreignKey: 'idUsuario', sourceKey: 'idUsuario'});
Campaign.belongsTo(User, { foreignKey: 'idUsuario', targetKey: 'idUsuario'});

export default User;