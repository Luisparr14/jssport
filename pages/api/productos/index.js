import { Producto } from "../../../entities"

export default async function obtenerProductos(req, res) {
  if(req.method === 'GET') {
    try {
    const productos = await Producto.findAll()
    return res.status(200).json({
      ok: true,
      message: 'Productos obtenidos correctamente',
      data: productos
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error del servidor'
    })
  }u
  }
}