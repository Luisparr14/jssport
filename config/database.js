import { Sequelize } from 'sequelize';

const DATABASE = process.env.DB_NAME;
const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASS;
const HOST = process.env.DB_HOST;

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: 'mysql',
  logging: false,
})

;(()=>{
  sequelize.authenticate()
    .then(() => {
      console.log('La conexion a la base de datos se ha realizado correctamente')
    })
})()

export default sequelize
