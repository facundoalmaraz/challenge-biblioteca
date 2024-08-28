import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Al registrar un usuario

const registrar = async (req, res) => {
  const saltRounds = 10;

  try {
    const { nombre, correo, password, rol } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear un nuevo usuario con Prisma
    const usuarioAlmacenado = await prisma.usuario.create({
      data: {
        nombre,
        correo,
        password: hashedPassword,
        rol, // Asegúrate de que el campo rol esté en el modelo y sea opcional o tenga un valor por defecto
      },
    });

    res.json({ msg: "Usuario Registrado", usuario: usuarioAlmacenado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

const autenticar = async (req, res) => {
  const { correo, password } = req.body;

  try {
    // Comprobar si el usuario existe
    const usuario = await prisma.usuario.findUnique({
      where: { correo },
    });

    if (!usuario) {
      const error = new Error("El usuario no existe");
      return res.status(404).json({ msg: error.message });
    }

    // Verificar la contraseña (ajusta esto según cómo almacenes las contraseñas)
    const esPasswordValido = await bcrypt.compare(password, usuario.password);

    if (esPasswordValido) {
      // Generar el token JWT
      const token = jwt.sign(
        { _id: usuario.id, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({
        _id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
        token,
      });
    } else {
      const error = new Error("El password es incorrecto");
      return res.status(403).json({ msg: error.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en la autenticación" });
  }
};

const perfil = async (req, res) => {
  try {
    const { usuario } = req;

    if (!usuario) {
      // Manejar caso en el que el usuario no está autenticado
      res.status(401).json({ msg: "Usuario no autenticado" });
      return;
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const inscribirEnListaEspera = async (req, res) => {
  const { usuarioId, libroId } = req.body;

  try {
    // Verificar si el libro está disponible
    const libro = await prisma.libro.findUnique({
      where: { id: Number(libroId) },
    });

    if (!libro) {
      return res.status(404).json({ msg: "El libro no existe." });
    }

    if (libro.disponible) {
      return res
        .status(400)
        .json({
          msg: "El libro está disponible, no es necesario inscribirse en la lista de espera.",
        });
    }

    // Inscribir al usuario en la lista de espera
    const nuevaListaEspera = await prisma.listaEspera.create({
      data: {
        usuarioId: Number(usuarioId),
        libroId: Number(libroId),
      },
    });

    res
      .status(201)
      .json({
        msg: "Inscripción en la lista de espera realizada con éxito.",
        listaEspera: nuevaListaEspera,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al inscribir en la lista de espera" });
  }
};

export { registrar, autenticar, perfil, inscribirEnListaEspera };
