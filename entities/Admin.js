import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Admin = sequelize.define('admin', {
  idadmin:{
    type: DataTypes.INTEGER(12),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true    
  },
  correo:{
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  contrasena:{
    type: DataTypes.STRING(230),
    allowNull: false
  }
},{
  timestamps: false,
  freezeTableName: true
})

export default Admin;