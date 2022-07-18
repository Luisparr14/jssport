import { Admin, Producto } from "../../../entities"

export default async function agregar(req, res) {
  if (req.method === 'POST') {
    try {
      const { idproducto, nombre, precio, admin } = req.body
      const { idadmin, correo } = admin

      const adminDB = await Admin.findOne({
        where: {
          idadmin,
          correo
        }
      })

      if (!adminDB) {
        return res.status(403).json({
          ok: false,
          message: 'No tiene permisos para agregar productos'
        })
      }

      if (!idproducto || !nombre || !precio) {
        return res.status(400).json({
          ok: false,
          message: 'Faltan datos'
        })
      }
      
      const findProducto = await Producto.findByPk(idproducto)
      
      if (findProducto) {
        return res.status(400).json({
          ok: false,
          message: 'El producto ya existe'
        })
      }

      const producto = await Producto.create({
        idproducto,
        nombre,
        precio
      })

      return res.status(200).json({
        ok: true,
        message: 'Producto agregado',
        data: producto
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