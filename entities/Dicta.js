import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Dicta = sequelize.define('dicta', {
  idclase:{
    type: DataTypes.INTEGER(9),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true    
  }  
},{
  timestamps: false,
  freezeTableName: true
})

export default Dicta;