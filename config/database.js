import { Sequelize } from 'sequelize';

// Se declaran las datos de la BD que se extraen de las varibles de antorno

const DATABASE = process.env.DB_NAME;
const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASS;
const HOST = process.env.DB_HOST;

// Se realiza la conexion a la BD y se guarda en una variable
const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: false,
})

;(()=>{
  // Se verifica si la conexion a la BD es correcta
  sequelize.authenticate()
    .then(() => {
      console.log('La conexion a la base de datos se ha realizado correctamente')
    }).catch(err => {
      console.log('Error al conectar a la base de datos: ', err)
    }
  )  
})()

// Se exporta la conexion a la BD
export default sequelize;