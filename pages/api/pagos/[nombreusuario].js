import { Factura, Pago, Producto, Usuario } from "../../../entities"

export default async function test(req, res) {
  if (req.method === 'GET') {
  
    try {
      const { nombreusuario } = req.query
      const usuario = await Usuario.findOne({
        where: {
          nombreusuario
        }
      })
      if (!usuario) {
        return res.status(400).json({
          ok: false,
          message: 'El usuario no existe'
        })
      }

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

      if (!pagos) {
        return res.status(400).json({
          ok: false,
          message: 'No hay pagos'
        })
      }

      return res.status(200).json({
        ok: true,
        message: 'Pagos recuperados',
        data: pagos,
        usuario: usuario.nombreusuario
      })

    } catch (error) {
      console.log(error)
      return res.status(500).json({
        ok: false,
        message: 'Error del servidor'
      })
    }
  } else {
    return res.status(405).json({
      ok: false,
      message: 'Method not allowed'
    })
  }
}