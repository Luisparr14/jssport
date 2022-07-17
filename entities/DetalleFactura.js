import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const DetalleFactura = sequelize.define('detalle_factura', {

}, {
  timestamps: false,
  freezeTableName: true
})

export default DetalleFactura;