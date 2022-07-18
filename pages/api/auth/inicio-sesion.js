import { Persona, Usuario } from "../../../entities"
import { compararContrasena } from "../../../lib/bcrypt";
export default async function inicioSesion(req, res) {
  if (req.method == 'POST') {
    try {
      const { usuario, contrasena } = req.body;
      const usuarioDB = await Usuario.findOne({
        where: {
          nombreusuario: usuario,
        },
        include: [{
          model: Persona,
          attributes: ['nombre', 'primer_apellido', 'segundo_apellido', 'celular', 'correo', 'peso', 'altura']
        }]
      })
      if (!usuarioDB) {
        return res.status(400).json({
          ok: false,
          message: 'Usuario incorrecto'
        })
      }
      if (usuarioDB) {
        const valido = await compararContrasena(contrasena, usuarioDB.getDataValue('contrasena'))
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
      return res.status(500).json({
        ok: false,
        message: 'Error al iniciar sesion',
      })
    }
  }
}