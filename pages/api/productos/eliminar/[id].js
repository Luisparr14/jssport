import { Producto } from "../../../../entities"

export default async function sumar(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query      

      const findProducto = await Producto.findByPk(id)

      if (!findProducto) {
        return res.status(400).json({
          ok: false,
          message: 'El producto no existe'
        })
      }

      await Producto.destroy({
        where: {
          idproducto: id
        }
      })

      return res.status(200).json({
        ok: true,
        message: 'Producto eliminado',
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        ok: false,
        message: 'Error del servidor'
      })
    }
  }
}