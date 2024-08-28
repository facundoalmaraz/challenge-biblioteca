import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Inscribir a un usuario en la lista de espera
export const inscribirListaEspera = async (req, res) => {
  const { usuarioId, libroId } = req.body;

  try {
    // Verificar si el libro tiene copias disponibles
    const libro = await prisma.libro.findUnique({
      where: { id: libroId },
    });

    if (libro.disponibles > 0) {
      return res.status(400).json({ error: 'El libro está disponible, no se puede inscribir en la lista de espera.' });
    }

    // Verificar si el usuario ya está en la lista de espera para ese libro
    const yaEnListaEspera = await prisma.listaEspera.findFirst({
      where: {
        usuarioId,
        libroId,
      },
    });

    if (yaEnListaEspera) {
      return res.status(400).json({ error: 'El usuario ya está en la lista de espera para este libro.' });
    }

    // Inscribir al usuario en la lista de espera
    const nuevaInscripcion = await prisma.listaEspera.create({
      data: {
        usuarioId,
        libroId,
      },
    });

    res.status(201).json(nuevaInscripcion);
  } catch (error) {
    res.status(500).json({ error: 'Error al inscribir en la lista de espera.' });
  }
};
