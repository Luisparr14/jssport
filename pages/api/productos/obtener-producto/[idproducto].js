import { Producto } from "../../../../entities"

// Metodo para obtener un producto especifico
export default async function obtenerProducto(req, res) {
  if(req.method === 'GET') {
    try {
      // Recibe el id del producto
      const { idproducto } = req.query

      // Busca el producto en la base de datos
      const producto = await Producto.findByPk(idproducto)

      // Si el producto no existe se muestra un error
      if(!producto) {
        return res.status(400).json({
          ok: false,
          message: 'El producto no existe'
        })
      }
      
      // Se devuelve el producto
      return res.status(200).json({
        ok: true,
        message: 'Producto encontrado',
        data: producto
      })

    } catch (error) {
      // Si hay un error se muestra un error
      return res.status(500).json({
        ok: false,
        message: 'Error del servidor',
      })
    }
  } else {
    // Si el metodo no es GET se muestra un error
    return res.status(405).json({
      ok: false,
      message: 'Method not allowed'
    })
  }
}