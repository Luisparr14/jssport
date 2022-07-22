import { Producto } from "../../../../entities"

// Metodo para editar un producto
export default async function editar(req, res) {
  // Solo metodo PUT
  if(req.method == "PUT"){
    try {
      // Recibe los datos del producto
      const { idproducto } = req.query
      const { producto } = req.body

      const { nombre, precio } = producto
      
      // SI falta algun dato se muestra un error
      if(!nombre || !precio){
        return res.status(400).json({
          ok: false,
          message: 'Faltan datos'
        })
      }
      
      // Actualiza el producto
      await Producto.update({
        nombre,
        precio
      }, {
        where: {
          idproducto
        }
      })

      // Se busca el producto en la base de datos
      const productoDB = await Producto.findByPk(idproducto)    

      // Se devuelve el producto actualizado
      return res.status(200).json({
        ok: true,
        message: 'Producto actualizado',
        data: productoDB
      })

    } catch (error) {
      // Si hay un error se muestra un error
      return res.status(500).json({
        ok: false,
        message: 'Error del servidor',
      })
    }
  }else{
    // Si el metodo no es PUT se muestra un error
    return res.status(405).json({
      ok: false,
      message: 'Method not allowed'
    })
  }
}