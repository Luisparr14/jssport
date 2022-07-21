import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Rutinas = sequelize.define('rutinas', {
  idrutina: {
    type: DataTypes.INTEGER(12),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  enfoque: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }
},{
  timestamps: false,
  freezeTableName: true
})

export default Rutinas;
