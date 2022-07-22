import { Persona, Usuario } from "../../../entities"
import { compararContrasena } from "../../../lib/bcrypt";

// Metodo para inciar sesion
export default async function inicioSesion(req, res) {
  if (req.method == 'POST') {
    try {

      // Recibe el usuario y la contraseña
      const { usuario, contrasena } = req.body;

      // Busca el usuario en la base de datos
      const usuarioDB = await Usuario.findOne({
        where: {
          nombreusuario: usuario,
        },        
        include: [{ // Se obtiene el usuario con todos los datos de la tabla persona
          model: Persona,
          attributes: ['nombre', 'primer_apellido', 'segundo_apellido', 'celular', 'correo', 'peso', 'altura']
        }]
      })

      // Si no existe el usuario se muestra un error
      if (!usuarioDB) {
        return res.status(400).json({
          ok: false,
          message: 'Usuario incorrecto'
        })
      }

      // Se compara la contraseña con la contraseña guardada en la base de datos
      if (usuarioDB) {
        const valido = await compararContrasena(contrasena, usuarioDB.getDataValue('contrasena'))

        // Si la contraseña no es valida se muestra un error sino se devuelve el usuario 
        if (valido) {
          return res.json({
            ok: true,
            message: 'Usuario correcto',
            data: usuarioDB,
          })
        } else {
          return res.json({
            ok: false,
            message: 'Contraseña incorrecta',
            data: {}
          })
        }
      }
    } catch (error) {

      // Si hay un error se muestra un error
      return res.status(500).json({
        ok: false,
        message: 'Error al iniciar sesion',
      })
    }
  }
}