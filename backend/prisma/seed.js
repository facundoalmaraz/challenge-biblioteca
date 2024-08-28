// prisma/seed.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.libro.createMany({
    data: [
      {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        portada:
          "https://www.rae.es/sites/default/files/portada_cien_anos_de_soledad_0.jpg",
        isbn: "9780307389732",
        copias: 10,
        disponibles: 10,
      },
      {
        titulo: "El Quijote",
        autor: "Miguel de Cervantes",
        portada:
          "https://www.planetadelibros.com/usuaris/libros/fotos/374/original/portada_don-quijote-de-la-mancha-comic_miguel-de-cervantes_202310231106.jpg",
        isbn: "9788491050076",
        copias: 5,
        disponibles: 5,
      },
      {
        titulo: "1984",
        autor: "George Orwell",
        portada:
          "https://images.cdn1.buscalibre.com/fit-in/360x360/b0/39/b039af065268818b7bd3b0e016f8db65.jpg",
        isbn: "9780451524935",
        copias: 8,
        disponibles: 8,
      },

      {
        titulo: "El principito",
        autor: "Antoine de Saint-Exupéry",
        portada:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvyjpvH7MiCwVxI8jMqFsnpAbMAL6xy03lzQ&s",
        isbn: "9780156012195",
        copias: 12,
        disponibles: 12,
      },
      {
        titulo: "Harry Potter y la piedra filosofal",
        autor: "J.K. Rowling",
        portada:
          "https://images.cdn3.buscalibre.com/fit-in/360x360/ce/e6/cee6ef96dad70d3f599b953f0e50afc7.jpg",
        isbn: "9788478884454",
        copias: 7,
        disponibles: 7,
      },
      {
        titulo: "El alquimista",
        autor: "Paulo Coelho",
        portada:
          "https://images.cdn3.buscalibre.com/fit-in/360x360/04/1f/041faab83743751d96b0b362733f33f4.jpg",
        isbn: "9780062511409",
        copias: 9,
        disponibles: 9,
      },
    ],
  });

  console.log("Seed de libros completado.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
