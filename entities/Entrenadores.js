import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Entrenadores = sequelize.define('entrenadores', {
  cedula: {
    type: DataTypes.STRING(14),
    allowNull: false,
    primaryKey: true
  },
  sueldo:{
    type: DataTypes.DECIMAL(7,2),
    allowNull: false,
  },
  idpersona: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //   model: 'persona',
    //   key: 'idpersona',
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE'      
    // }
  }
},{
  timestamps: false,
  freezeTableName: true
})

export default Entrenadores;