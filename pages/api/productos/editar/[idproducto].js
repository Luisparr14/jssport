import { Producto } from "../../../../entities"

export default async function editar(req, res) {
  if(req.method == "PUT"){
    try {
      const { idproducto } = req.query
      const { producto } = req.body
      const { nombre, precio } = producto
      console.log(producto)
      if(!nombre || !precio){
        return res.status(400).json({
          ok: false,
          message: 'Faltan datos'
        })
      }
      
      await Producto.update({
        nombre,
        precio
      }, {
        where: {
          idproducto
        }
      })

      const productoDB = await Producto.findByPk(idproducto)    

      return res.status(200).json({
        ok: true,
        message: 'Producto actualizado',
        data: productoDB
      })

    } catch (error) {
      console.log(error)
      return res.status(500).json({
        ok: false,
        message: 'Error del servidor',
      })
    }
  }else{
    return res.status(405).json({
      ok: false,
      message: 'Method not allowed'
    })
  }
}