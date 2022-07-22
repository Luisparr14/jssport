import { Admin } from "../../../../entities";

// Inicio de sesion de administrador
export default async function inicioSesion(req, res) {
  if (req.method == 'POST') {
    try {
      // Recibe los datos del administrador
      const { correo, contrasena } = req.body;

      // Busca el administrador en la base de datos
      const adminDB = await Admin.findOne({
        where: {
          correo,
        }
      })

      // Si no existe el administrador se muestra un error
      if (!adminDB) {
        return res.status(403).json({
          ok: false,
          message: 'Acceso denegado',
        })
      }

      // Se verifica que la contraseña sea correcta
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
      // Si hay un error se muestra un error
      return res.status(500).json({
        ok: false,
        message: 'Error al iniciar sesion',
      })
    }
  }
}