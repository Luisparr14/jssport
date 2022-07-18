import { Producto } from "../../../../entities"

export default async function obtenerProducto(req, res) {
  if(req.method === 'GET') {
    try {
      const { idproducto } = req.query
      const producto = await Producto.findByPk(idproducto)
      if(!producto) {
        return res.status(400).json({
          ok: false,
          message: 'El producto no existe'
        })
      }
      
      return res.status(200).json({
        ok: true,
        message: 'Producto encontrado',
        data: producto
      })

    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: 'Error del servidor',
      })
    }
  } else {
    return res.status(405).json({
      ok: false,
      message: 'Method not allowed'
    })
  }
}