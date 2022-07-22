import { Factura, Pago, Producto, Usuario } from "../../../entities"

// Metodo que devulve los pagos hechos por un usuario
export default async function pagos(req, res) {
  if (req.method === 'GET') {
  
    try {
      // recibe el nombre del usuario
      const { nombreusuario } = req.query

      // Verifica que el usuario exista
      const usuario = await Usuario.findOne({
        where: {
          nombreusuario
        }
      })

      // Si el usuario no existe, devuelve un error
      if (!usuario) {
        return res.status(400).json({
          ok: false,
          message: 'El usuario no existe'
        })
      }

      // Busca los pagos hechos por el usuario
      const pagos = await Pago.findAll({
        include: [
          {
            model: Factura,
            include: [
              {
                model: Producto
              }
            ]
          },
          {
            model: Usuario,
            attributes: ["nombreusuario"],
            where: {
              nombreusuario
            }
          }
        ]
      })

      // Si no hay pagos, devuelve un mensaje de pagos no encontrados
      if (!pagos) {
        return res.status(400).json({
          ok: false,
          message: 'No hay pagos'
        })
      }

      // Si hay pagos, devuelve un mensaje de pagos encontrados
      return res.status(200).json({
        ok: true,
        message: 'Pagos recuperados',
        data: pagos,
        usuario: usuario.nombreusuario
      })

    } catch (error) {
      console.log(error)
      // Si hay un error, devuelve un mensaje de error
      return res.status(500).json({
        ok: false,
        message: 'Error del servidor'
      })
    }
  } else {
    // Si el metodo no es GET, devuelve un error
    return res.status(405).json({
      ok: false,
      message: 'Method not allowed'
    })
  }
}