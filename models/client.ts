import { DataTypes } from 'sequelize';
import db from '../database/connection';
import User from './user';

// Modelo relacionado a los clientes
const Client = db.define('cliente', {
    idCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'cliente'
});

Client.hasMany(User, { foreignKey: 'idCliente', sourceKey: 'idCliente'});
User.belongsTo(Client, { foreignKey: 'idCliente', targetKey: 'idCliente'});

export default Client;