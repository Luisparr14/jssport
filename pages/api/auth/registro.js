import sequelize from "../../../config/database";
import { Usuario, Persona } from "../../../entities"
import { generarHash } from "../../../lib/bcrypt";
export default async function registro(req, res) {
  const t = await sequelize.transaction();
  
  if (req.method === 'POST') {
    try {
      const { nombre, primerapellido, segundoapellido, celular, correo, peso, altura, usuario, contrasena, contrasenaconfirmacion, plan } = req.body;

      if (contrasena !== contrasenaconfirmacion) {
        return res.status(400).json({
          message: "Las contraseñas no coinciden"
        })
      }

      const persona = await Persona.create({
        nombre,
        primer_apellido: primerapellido,
        segundo_apellido: segundoapellido,
        celular,
        correo,
        peso,
        altura
      }, { transaction: t });

      const idpersona = persona.dataValues.idpersona;

      const hashContrasena = await generarHash(contrasena);

      const usuarioBD = await Usuario.create({
        nombreusuario: usuario,
        contrasena: hashContrasena,
        idpersona,
        plan
      }, { transaction: t });

      await t.commit();

      return res.status(200).json({
        ok: true,
        message: 'Usuario registrado correctamente',
        data: {
          usuario: usuarioBD.dataValues.nombreusuario,
          nombre: persona.dataValues.nombre,
        }
      });
    } catch (error) {
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