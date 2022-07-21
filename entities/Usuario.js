import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Usuario = sequelize.define('usuarios', {
  nombreusuario: {
    type: DataTypes.STRING(30),
    allowNull: false,
    primaryKey: true,
  },
  contrasena: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  idpersona: {
    type: DataTypes.INTEGER(12),
    allowNull: false,
  },
  plan:{
    type: DataTypes.INTEGER(9),
    allowNull: true,
  }
}, {
  timestamps: false,
  freezeTableName: true
})

export default Usuario;