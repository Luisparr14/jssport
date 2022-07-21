import Persona from "./Persona";
import Usuario from "./Usuario";
import Entrenadores from "./Entrenadores";
import Planes from "./Planes";
import Rutinas from "./Rutinas";
import PlanRutina from "./Plan_Rutina";
import Dicta from "./Dicta";
import sequelize from "../config/database";
import Producto from "./Producto";
import DetalleFactura from "./DetalleFactura";
import Factura from "./Factura";
import Pago from "./Pago";
import Admin from "./Admin";

Planes.belongsToMany(Rutinas, { through: PlanRutina });
Rutinas.belongsToMany(Planes, { through: PlanRutina });

Rutinas.belongsToMany(Entrenadores, { through: Dicta })
Entrenadores.belongsToMany(Rutinas, { through: Dicta })

Entrenadores.belongsTo(Persona, { foreignKey: "idpersona" });

// Relacion de planes y usuarios
Planes.hasOne(Usuario, {
  foreignKey: "plan",
  as: "idPlan",
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
});

Usuario.belongsTo(Planes, {
  foreignKey: "plan",
});

// Relacion de personas y usuarios
Persona.hasOne(Usuario, {
  foreignKey: "idpersona",
  as: "PersonaUsuarios",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Usuario.belongsTo(Persona, {
  foreignKey: "idpersona"
})

// Relacion de personas y entrenadores
Persona.hasOne(Entrenadores, {
  foreignKey: "idpersona",
  as: "PersonaUsuariosEntrenadores",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Entrenadores.belongsTo(Persona, {
  foreignKey: "idpersona"
})

//Relacion de pagos con usuarios
Usuario.hasMany(Pago, {
  foreignKey: "nombreusuario",
  as: "nombreUsuario",
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
})

Pago.belongsTo(Usuario, {
  foreignKey: "nombreusuario"
});

Usuario.belongsTo(Pago, {
  foreignKey: "nombreusuario",
})

//Relacion factura y productos
Producto.hasMany(Factura, {
  foreignKey: "idproducto",
  as: "ProductosFactura",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Producto.belongsTo(Factura, {
  foreignKey: "idproducto",
})

Factura.belongsTo(Producto, {
  foreignKey: "idproducto",
})


// Relacion muchos a muchos factura y pagos 
Factura.belongsToMany(Pago, { through: DetalleFactura });
Pago.belongsToMany(Factura, { through: DetalleFactura });

; (async () => {
  try {
    await sequelize.sync({
      force: false      
    })
    const admin = await Admin.findOne({
      where: {
        correo: "andrea@andrea.com"
      }
    })

    if (!admin) {
      await Admin.create({
        correo: "andrea@andrea.com",
        contrasena: "123456"
      })
    }
    console.log("Sincronizado");
  } catch (error) {
    console.error({
      "error": "Error menor con mock iniciales",
      "sincronizado": "si... pero con error",
      "error_message": error
    });
  }
})();

export {
  Persona,
  Usuario,
  Entrenadores,
  Planes,
  Rutinas,
  PlanRutina,
  Dicta,
  Producto,
  Factura,
  DetalleFactura,
  Pago,
  Admin
};