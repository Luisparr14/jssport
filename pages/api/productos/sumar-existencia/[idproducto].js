import { Producto } from "../../../../entities"

// Metodo para agregar cantidad de un producto
export default async function sumar(req, res) {
  if (req.method === 'POST') {
    try {
      // Recibe el id del producto y la cantidad a sumar
      const { idproducto } = req.query
      const { cantidad } = req.body      
      
      // SI falta algun dato se muestra un error
      if (!cantidad) {
        return res.status(400).json({
          ok: false,
          message: 'Faltan datos'
        })
      }

      // SI la cantidad es menor a 0 se muestra un error
      if (cantidad <= 0) {
        return res.status(400).json({
          ok: false,
          message: 'La cantidad debe ser mayor a 0'
        })
      }

      // Busca el producto en la base de datos
      const findProducto = await Producto.findByPk(idproducto)

      // Si el producto no existe se muestra un error
      if (!findProducto) {
        return res.status(400).json({
          ok: false,
          message: 'El producto no existe'
        })
      }

      // Suma la cantidad al producto
      await Producto.update({
        cantidad: parseInt(findProducto.cantidad) + parseInt(cantidad)
      }, {
        where: {
          idproducto
        }
      })

      // Se busca el producto en la base de datos
      const producto = await Producto.findByPk(idproducto)

      // Se devuelve el producto actualizado
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