import { Factura, Pago, Usuario } from "../../../entities"

export default async function test(req, res) {
  if (req.method === 'GET') {
    const facturas = {
      referencia: "",
      estado: false,
      fecha: '',
      productos: [
        {
          nombre: '',
          cantidad: 0,
          precio: 0,
          total: 0
        }
      ],
    }
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


      const { facturas } = pagos


      return res.status(200).json({
        ok: true,
        message: 'Pagos recuperados',
        data: pagos
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