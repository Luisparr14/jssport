import { DetalleFactura, Factura, Producto, Pago, Usuario, sequelize, Persona } from "../../../entities";


const generarFacturas = async (productos, idPago) => {
  const tr = await sequelize.transaction();
  return new Promise((resolve, reject) => {
    const dataFacturas = [];
    productos.forEach(async producto => {
      const productoDB = await Producto.findByPk(producto.idproducto);

      if (!productoDB) {
        return reject({
          ok: false,
          mensaje: `El producto ${producto.nombre} no existe`
        });
      }

      if (productoDB.cantidad < producto.cantidad) {
        return reject({
          ok: false,
          mensaje: `El producto ${productoDB.nombre} no tiene suficiente cantidad`
        });
      }

      productoDB.cantidad -= producto.cantidad;
      console.log("Cantidad database",productoDB.cantidad);
      await productoDB.update({ cantidad: productoDB.cantidad }, { transaction: tr });

      const factura = await Factura.create({
        idproducto: producto.idproducto,
        cantidad: producto.cantidad,
        fecha: new Date(),
      }, { transaction: tr });

      dataFacturas.push(factura);
      await DetalleFactura.create({
        facturaIdfactura: factura.getDataValue('idfactura'),
        pagoIdpago: idPago,
      }, { transaction: tr });

      await tr.commit();
      return resolve({
        ok: true,
        mensaje: "Factura generada",
        data: dataFacturas
      });
    })
  })
}


export default async function pagar(req, res) {
  const dataFacturas = [];
  const t = await sequelize.transaction();
  try {
    const { productos, usuario, celular } = req.body;
    if (!usuario || !celular || !productos) {
      return res.status(400).json({
        ok: false,
        mensaje: "Faltan datos"
      })
    }

    if (productos.length === 0) {
      return res.status(400).json({
        ok: false,
        mensaje: "No hay productos en el carrito"
      })
    }

    const usuarioDB = await Usuario.findOne({
      where: {
        nombreusuario: usuario,
      },
      include: [{
        model: Persona,
        attributes: ['nombre', 'primer_apellido', 'segundo_apellido', 'celular', 'correo', 'peso', 'altura']
      }]
    })

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El usuario no existe'
      })
    }

    const idPago = Math.random().toString(36).substring(2, 15);
    console.log("Id Pago", idPago);
    const pago = await Pago.create({
      idpago: idPago,
      nombreusuario: usuarioDB.getDataValue('nombreusuario'),
      generado: new Date(),
      estado: false
    }, { transaction: t });

    const respuesta = await generarFacturas(productos, idPago);

    console.log("Respuesta", respuesta);

    if (!(respuesta.ok)) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        mensaje: respuesta.mensaje
      })
    }

    dataFacturas.push(respuesta.data);
    console.log("Facturas", respuesta.data);
    await t.commit();
    return res.status(200).json({
      ok: true,
      message: 'Pago listo para ser procesado',
      data: {
        pago,
        dataFacturas
      }
    })
  } catch (error) {
    await t.rollback();
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error del servidor'
    })
  }
}