import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Admin = sequelize.define('admin', {
  idadmin:{
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true    
  },
  correo:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  contrasena:{
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  timestamps: false,
  freezeTableName: true
})

export default Admin;