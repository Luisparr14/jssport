import { Producto } from "../../../../entities"

// Metodo para eliminar un producto
export default async function sumar(req, res) {
  // solo metodo DELETE
  if (req.method === 'DELETE') {
    try {
      // Recibe el id del producto
      const { id } = req.query    
      
      // Busca el producto en la base de datos
      const findProducto = await Producto.findByPk(id)

      // Si el producto no existe se muestra un error
      if (!findProducto) {
        return res.status(400).json({
          ok: false,
          message: 'El producto no existe'
        })
      }

      // Elimina el producto por id
      await Producto.destroy({
        where: {
          idproducto: id
        }
      })

      // Se devuelve un mensaje de que el producto fue eliminado
      return res.status(200).json({
        ok: true,
        message: 'Producto eliminado',
      })
    } catch (error) {
      // Si hay un error se muestra un error
      return res.status(500).json({
        ok: false,
        message: 'Error del servidor'
      })
    }
  }
}