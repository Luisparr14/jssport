import sequelize from "../../../config/database";
import { Usuario, Persona } from "../../../entities"
import { generarHash } from "../../../lib/bcrypt";

// Metodo para registrar un usuario
export default async function registro(req, res) {

  // se crea una transaccion para poder hacer rollback si hay un error
  const t = await sequelize.transaction();  
  if (req.method === 'POST') {
    try {

      // Se obtienen los datos del usuario
      const { nombre, primerapellido, segundoapellido, celular, correo, peso, altura, usuario, contrasena, contrasenaconfirmacion, plan } = req.body;

      // Si las contraseñas no coinciden se muestra un error
      if (contrasena !== contrasenaconfirmacion) {
        return res.status(400).json({
          message: "Las contraseñas no coinciden"
        })
      }

      // Se crea a la persona con los datos 
      const persona = await Persona.create({
        nombre,
        primer_apellido: primerapellido,
        segundo_apellido: segundoapellido,
        celular,
        correo,
        peso,
        altura
      }, { transaction: t });

      // Se extrae el id de la persona
      const idpersona = persona.dataValues.idpersona;

      // Se encripta la contraseña
      const hashContrasena = await generarHash(contrasena);

      // Se crea el usuario con los datos de la persona y la contraseña encriptada
      const usuarioBD = await Usuario.create({
        nombreusuario: usuario,
        contrasena: hashContrasena,
        idpersona,
        plan
      }, { transaction: t });

      // Se cierra la transaccion y se confiman los cambios
      await t.commit();

      // Se muestra un mensaje de exito
      return res.status(200).json({
        ok: true,
        message: 'Usuario registrado correctamente',
        data: {
          usuario: usuarioBD.dataValues.nombreusuario,
          nombre: persona.dataValues.nombre,
        }
      });
    } catch (error) {
      // Si hay un error se muestra un error y se hace rollback para deshacer los cambios
      await t.rollback();
      return res.status(500).json({
        ok: false,
        message: 'Error al registrar el usuario, revise los datos',
        error: error.message
      });
    }
  } else {
    res.status(405).json({
      ok: false,
      mensaje: "Metodo no permitido"
    })
  }
}