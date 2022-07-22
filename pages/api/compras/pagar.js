import sequelize from "../../../config/database";
import { DetalleFactura, Factura, Producto, Pago, Usuario, Persona } from "../../../entities";

// Metodo para generar facturas
export default async function pagar(req, res) {
  const dataFacturas = [];

  // se crea una transaccion para poder hacer rollback si hay un error
  const t = await sequelize.transaction();
  try {

    // Se obtienen los datos del pago
    const { productos, usuario, celular } = req.body;

    // Si falta algun dato se muestra un error
    if (!usuario || !celular || !productos) {
      return res.status(400).json({
        ok: false,
        message: "Faltan datos"
      })
    }

    // Si no hay productos se muestra un error
    if (productos.length === 0) {
      return res.status(400).json({
        ok: false,
        message: "No hay productos en el carrito"
      })
    }

    // Se busca el usuario que realiza el pago en la base de datos
    const usuarioDB = await Usuario.findOne({
      where: {
        nombreusuario: usuario,
      },
      include: [{
        model: Persona,
        attributes: ['nombre', 'primer_apellido', 'segundo_apellido', 'celular', 'correo', 'peso', 'altura']
      }]
    })
    
    // Si no existe el usuario se muestra un error
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        message: 'Sus credenciales no coinciden con nuestros registros'
      })
    }

    // Se genera el id del pago
    const idPago = Math.random().toString(36).substring(2, 15);
    
    // Se genera el pago con el id generado
    const pago = await Pago.create({
      idpago: idPago,
      nombreusuario: usuarioDB.getDataValue('nombreusuario'),
      generado: new Date(),
      estado: false
    }, { transaction: t });

    // Se generan las facturas y se espera una promesa para poder hacer el rollback si hay un error
    const respuesta = await generarFacturas(productos, idPago, t);

    // Si hay un error se hace un rollback
    if (!(respuesta.ok)) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        message: respuesta.message
      })
    }

    // Se guardan las facturas en un arreglo
    dataFacturas.push(respuesta.data);

    // Se guarda el pago en la base de datos
    await t.commit()

    // Se muestra un mensaje de exito con los datos del pago y facturas
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
    return res.status(500).json({
      ok: false,
      message: error.message
    })
  }
}

const generarFacturas = async (productos, idPago, tr) => {
  return new Promise(async (resolve, reject) => {
    const dataFacturas = [];
    for (let i = 0; i < productos.length; i++) {
      const productoDB = await Producto.findByPk(productos[i].idproducto);
      if (!productoDB || productoDB === null) {
        return reject({
          ok: false,
          message: `El producto ${productos[i].nombre} no existe`
        });
      }
      if (productoDB.cantidad < productos[i].cantidad) {
        return reject({
          ok: false,
          message: `El producto ${productoDB.nombre} no tiene suficiente cantidad`
        });
      }
      productoDB.cantidad -= productos[i].cantidad;
      await productoDB.update({ cantidad: productoDB.cantidad }, { transaction: tr });
      const factura = await Factura.create({
        idproducto: productoDB.idproducto,
        cantidad: productos[i].cantidad,
        fecha: new Date(),
      }, { transaction: tr });
      
      dataFacturas.push(factura);

      await DetalleFactura.create({
        facturaIdfactura: factura.getDataValue('idfactura'),
        pagoIdpago: idPago,
      }, { transaction: tr });
    }
    return resolve({
      ok: true,
      message: "Factura generada",
      data: dataFacturas
    });
  })
}