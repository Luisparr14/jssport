import { Admin, Producto } from "../../../entities"

export default async function agregar(req, res) {
  if (req.method === 'POST') {
    try {
      // Recibe los datos del producto
      const { idproducto, nombre, precio, admin } = req.body

      // Recibe el id del admin que agrega el producto
      const { idadmin, correo } = admin

      // Se verifica que el admin exista
      const adminDB = await Admin.findOne({
        where: {
          idadmin,
          correo
        }
      })

      // Si el admin no existe se muestra un error
      if (!adminDB) {
        return res.status(403).json({
          ok: false,
          message: 'No tiene permisos para agregar productos'
        })
      }

      // Se verifica que el producto tenga los datos necesarios
      if (!idproducto || !nombre || !precio) {
        return res.status(400).json({
          ok: false,
          message: 'Faltan datos'
        })
      }
      
      // Se busca el producto en la base de datos
      const findProducto = await Producto.findByPk(idproducto)
      
      // Si el producto existe se muestra un error
      if (findProducto) {
        return res.status(400).json({
          ok: false,
          message: 'El producto ya existe'
        })
      }

      // Se crea el producto
      const producto = await Producto.create({
        idproducto,
        nombre,
        precio
      })

      // Se muestra el producto creado
      return res.status(200).json({
        ok: true,
        message: 'Producto agregado',
        data: producto
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