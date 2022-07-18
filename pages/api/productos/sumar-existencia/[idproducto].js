import { Producto } from "../../../../entities"

export default async function sumar(req, res) {
  if (req.method === 'POST') {
    try {
      const { idproducto } = req.query
      const { cantidad } = req.body      
      if (!cantidad) {
        return res.status(400).json({
          ok: false,
          message: 'Faltan datos'
        })
      }

      if (cantidad <= 0) {
        return res.status(400).json({
          ok: false,
          message: 'La cantidad debe ser mayor a 0'
        })
      }

      const findProducto = await Producto.findByPk(idproducto)

      if (!findProducto) {
        return res.status(400).json({
          ok: false,
          message: 'El producto no existe'
        })
      }

      await Producto.update({
        cantidad: parseInt(findProducto.cantidad) + parseInt(cantidad)
      }, {
        where: {
          idproducto
        }
      })

      const producto = await Producto.findByPk(idproducto)

      return res.status(200).json({
        ok: true,
        message: 'Producto actualizado',
        data: producto
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        ok: false,
        message: 'Error del servidor',
      })
    }
  }
}