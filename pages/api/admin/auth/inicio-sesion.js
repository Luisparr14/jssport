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
        return res.status(403).json({
          ok: false,
          message: 'Acceso denegado',
        })
      }
      if (adminDB) {
        const valido = adminDB.getDataValue('contrasena') === contrasena;
        if (valido) {
          return res.status(200).json({
            ok: true,
            message: 'Acceso permitido',
            data: adminDB,
          })
        } else {
          return res.status(403).json({
            ok: false,
            message: 'Acceso denegado'
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