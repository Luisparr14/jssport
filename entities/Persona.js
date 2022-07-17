import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Persona = sequelize.define('personas', {
  idpersona: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  primer_apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  segundo_apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  celular: {
    type: DataTypes.STRING,
    validate: {
      is: /^[0-9]{10}$/
    },
    unique: true,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    },
    unique: true
  },
  peso: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  altura: {
    type: DataTypes.FLOAT,
    allowNull: true,
  }
}, {
  timestamps: false,
  freezeTableName: true
});

export default Persona;