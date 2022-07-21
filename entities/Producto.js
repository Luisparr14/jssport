import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Producto = sequelize.define('productos', {
  idproducto: {
    type: DataTypes.INTEGER(12),
    allowNull: false,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT(9),
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER(9),
    allowNull: false,
    defaultValue: 0
  }
}, {
  timestamps: false,
  freezeTableName: true
});

export default Producto;