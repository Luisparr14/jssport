import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Rutinas = sequelize.define('rutinas', {
  idrutina: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  enfoque: {
    type: DataTypes.STRING,
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
