import { DetalleFactura, Factura, Pago, Persona, Producto, Usuario } from "../../entities"

export default async function test(req, res) {
  const pagos = await Pago.findAll({
    include: [
      {
        model: Factura,
        include: [
          {
            model: Producto,
          }
        ]
      },
      {
        model: Usuario,
        attributes: ["nombreusuario"]      
      }
    ]
  })
  return res.json({
    message: 'Test',
    pagos
  })
}