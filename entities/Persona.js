import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Persona = sequelize.define('personas', {
  idpersona: {
    type: DataTypes.INTEGER(12),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  primer_apellido: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  segundo_apellido: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  celular: {
    type: DataTypes.STRING(10),
    validate: {
      is: /^[0-9]{10}$/
    },
    unique: true,
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isEmail: true
    },
    unique: true
  },
  peso: {
    type: DataTypes.FLOAT(3),
    allowNull: true,
  },
  altura: {
    type: DataTypes.FLOAT(3),
    allowNull: true,
  }
}, {
  timestamps: false,
  freezeTableName: true
});

export default Persona;