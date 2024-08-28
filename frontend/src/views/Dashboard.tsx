import React, { useState } from "react";
import ModalReserva from "../components/ModalReserva";
import ModalEditar from "../components/ModalEditar";
import useBiblioteca from "../hooks/useBiblioteca";
import useAuth from "../hooks/useAuth";

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  copias: number;
  disponibles: number;
}

export const Dashboard = () => {
  const { libros, editarLibro, eliminarLibro } = useBiblioteca();
  const { auth } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [selectedLibro, setSelectedLibro] = useState<Libro | null>(null);
  const [editedLibro, setEditedLibro] = useState<Partial<Libro>>({});

  const openModal = (libro: Libro) => {
    setSelectedLibro(libro);
    if (auth?.rol === "ADMIN") {
      setEditedLibro(libro);
      setIsEditOpen(true);
    } else {
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsEditOpen(false);
    setSelectedLibro(null);
    setEditedLibro({});
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedLibro({
      ...editedLibro,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditar = async () => {
    editarLibro(editedLibro as Libro);
    closeModal();
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Libros Disponibles</h1>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {libros.map((libro) => (
          <div key={libro.id} className="bg-white p-4 rounded-lg shadow-lg ">
            <img
              src={libro.portada}
              alt="Libro"
              className="h-48 w-auto mx-auto"
            />
            <h2 className="text-xl font-semibold text-center">{libro.titulo}</h2>
            <p className="text-sm text-center">{libro.autor}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => openModal(libro)}
                className={`mt-4 px-4 py-2 rounded-lg ${
                  auth?.rol === "ADMIN"
                    ? "bg-yellow-500 text-white"
                    : "bg-slate-800 text-white"
                }`}
              >
                {auth?.rol === "ADMIN" ? "Editar" : "Reservar"}
              </button>

              {auth?.rol === "ADMIN" && (
                <button
                  onClick={() => eliminarLibro(libro.id)}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))}

        {libros.length === 0 && <p>No hay libros disponibles</p>}
      </div>

      <ModalReserva
        isOpen={isOpen}
        closeModal={closeModal}
        selectedLibro={selectedLibro}
      />

      <ModalEditar
        isEditOpen={isEditOpen}
        closeModal={closeModal}
        editedLibro={editedLibro}
        handleEditChange={handleEditChange}
        handleEditar={handleEditar}
      />
    </>
  );
};
