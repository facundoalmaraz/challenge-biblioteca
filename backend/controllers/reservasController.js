import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Listar todas las reservas
export const listarReservas = async (req, res) => {
  try {
    const reservas = await prisma.reserva.findMany({
      include: {
        usuario: true,
        libro: true,
      },
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: "Error al listar las reservas" });
  }
};

// Buscar reservas por nombre de usuario
export const buscarReservasPorUsuario = async (req, res) => {
  const { nombre } = req.query;

  try {
    console.log("Buscando reservas para el usuario:", nombre);

    const reservas = await prisma.reserva.findMany({
      where: {
        usuario: {
          nombre: {
            contains: nombre,
           
          },
        },
      },
      include: {
        usuario: true,
        libro: true,
      },
    });

    console.log("Reservas encontradas:", reservas);

    if (reservas.length === 0) {
      return res
        .status(404)
        .json({
          error: "No se encontraron reservas para el usuario especificado",
        });
    }

    res.json(reservas);
  } catch (error) {
    console.error("Error al buscar reservas por usuario:", error);
    res.status(500).json({ error: "Error al buscar reservas por usuario" });
  }
};

// Crear una nueva reserva
export const crearReserva = async (req, res) => {
  const { usuarioId, libroId } = req.body;

  try {
    // Verificar si el usuario ya tiene 5 libros reservados
    const reservasUsuario = await prisma.reserva.count({
      where: { usuarioId },
    });

    if (reservasUsuario >= 5) {
      return res
        .status(400)
        .json({
          error:
            "El usuario ya tiene 5 libros reservados. No puede reservar más.",
        });
    }

    // Verificar si el libro tiene copias disponibles
    const libro = await prisma.libro.findUnique({
      where: { id: libroId },
    });

    if (!libro) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    if (libro.disponibles <= 0) {
      return res
        .status(400)
        .json({
          error: "No hay copias disponibles de este libro para reservar.",
        });
    }

    // Crear la reserva
    const nuevaReserva = await prisma.reserva.create({
      data: {
        usuarioId,
        libroId,
      },
    });

    // Reducir el número de copias disponibles
    await prisma.libro.update({
      where: { id: libroId },
      data: {
        disponibles: {
          decrement: 1,
        },
      },
    });

    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la reserva" });
  }
};
