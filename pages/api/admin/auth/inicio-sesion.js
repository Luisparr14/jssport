import { Admin } from "../../../../entities";

export default async function inicioSesion(req, res) {
  if (req.method == 'POST') {
    try {
      const { correo, contrasena } = req.body;
      const adminDB = await Admin.findOne({
        where: {
          correo,
        }
      })
      if (!adminDB) {
        return res.status(400).json({
          ok: false,
          message: 'Admin incorrecto'
        })
      }
      if (adminDB) {
        const valido = adminDB.getDataValue('contrasena') === contrasena;
        if (valido) {
          return res.status(200).json({
            ok: true,
            message: 'Admin correcto',
            data: adminDB,
          })
        } else {
          return res.status(403).json({
            ok: false,
            message: 'Contraseña incorrecta'
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