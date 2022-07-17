import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const PlanRutina = sequelize.define('plan_rutina', {
  
},{
  timestamps: false,
  freezeTableName: true
})



export default PlanRutina;