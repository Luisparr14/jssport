import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Planes = sequelize.define('planes', {

  idplan: {
    type: DataTypes.INTEGER(12),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT(9),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }
}, {
  timestamps: false,
  freezeTableName: true
})

export default Planes;