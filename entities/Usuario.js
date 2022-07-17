import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Usuario = sequelize.define('usuarios', {
  nombreusuario: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  contrasena: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  idpersona: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  plan:{
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  timestamps: false,
  freezeTableName: true
})

export default Usuario;