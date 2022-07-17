import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Factura = sequelize.define('facturas', {
  idfactura: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idproducto: {
    type: DataTypes.INTEGER,
    allowNull: false    
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  timestamps: false,
  freezeTableName: true
})

export default Factura;