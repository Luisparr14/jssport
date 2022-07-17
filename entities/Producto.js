import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Producto = sequelize.define('productos', {
  idproducto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  timestamps: false,
  freezeTableName: true
});

export default Producto;