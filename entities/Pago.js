import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Pago = sequelize.define('pagos', {
  idpago: {
    type: DataTypes.STRING(12),
    allowNull: false,
    primaryKey: true,
  },
  nombreusuario: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  generado: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  timestamps: false,
  freezeTableName: true
})

export default Pago;