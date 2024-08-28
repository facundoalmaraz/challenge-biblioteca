import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Obtener todos los libros, ordenados alfabéticamente
export const obtenerLibros = async (req, res) => {
  try {
    const libros = await prisma.libro.findMany({
      orderBy: {
        titulo: "asc",
      },
    });
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los libros" });
  }
};

// Actualizar la información de un libro (solo admin)
export const actualizarLibro = async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, isbn, copias } = req.body;


  try {
    // Verificar si el libro existe
    const libroExistente = await prisma.libro.findUnique({
      where: { id: parseInt(id) },
    });

    if (!libroExistente) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    // Calcula la diferencia en copias disponibles si se actualiza el número de copias
    let nuevasCopiasDisponibles = libroExistente.disponibles;
    if (copias !== undefined && copias !== libroExistente.copias) {
      const diferenciaCopias = copias - libroExistente.copias;
      nuevasCopiasDisponibles = Math.max(libroExistente.disponibles + diferenciaCopias, 0);
    }

    // Actualizar el libro
    const libroActualizado = await prisma.libro.update({
      where: { id: parseInt(id) },
      data: {
        titulo,
        autor,
        isbn,
        copias: copias !== undefined ? copias : libroExistente.copias,
        disponibles: nuevasCopiasDisponibles,
      },
    });

    res.json(libroActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
};

// Eliminar un libro (solo admin)
export const eliminarLibro = async (req, res) => {
  const { id } = req.params;

 
  try {
    // Verificar si el libro existe
    const libroExistente = await prisma.libro.findUnique({
      where: { id: parseInt(id) },
    });

    if (!libroExistente) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    // Eliminar el libro
    await prisma.libro.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).json({ message: 'Libro eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
};