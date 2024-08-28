import jwt from "jsonwebtoken";


import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar el usuario en la base de datos con Prisma
      const usuario = await prisma.usuario.findUnique({
        where: { id: decoded._id },
        select: {
          id: true,
          nombre: true,
          correo: true,
          rol: true,
          // No seleccionar el campo de la contraseña y otros campos sensibles
        },
      });

      if (!usuario) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }

      req.usuario = usuario;

      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ msg: "Token no válido" });
    }
  }

  if (!token) {
    const error = new Error("Token no proporcionado");
    return res.status(401).json({ msg: error.message });
  }
};

export default checkAuth;
