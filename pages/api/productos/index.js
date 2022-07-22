import { Producto } from "../../../entities"

// metodo para obtener todos los productos
export default async function obtenerProductos(req, res) {
  if (req.method === 'GET') {
    try {

      // Se guardan los productos en una constante
      const productos = await Producto.findAll()
      return res.status(200).json({
        ok: true,
        message: 'Productos obtenidos correctamente',
        data: productos
      })
    } catch (error) {

      // Si hay un error se muestra el error
      return res.status(500).json({
        ok: false,
        message: 'Error del servidor'
      })
    }
  }
}