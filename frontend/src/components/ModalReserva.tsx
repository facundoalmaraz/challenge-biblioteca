import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import useBiblioteca from "../hooks/useBiblioteca";
import Swal from "sweetalert2";

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  copias: number;
  disponibles: number;
}

interface ModalReservaProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedLibro: Libro | null;
  confirmarReserva: () => void;
}

const ModalReserva: React.FC<ModalReservaProps> = ({
  isOpen,
  closeModal,
  selectedLibro,
}) => {
  const { auth } = useAuth();

  console.log(auth);
  console.log(selectedLibro);

  const confirmarReserva = async () => {
    if (!selectedLibro || !auth?.id) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/reservas`,
        {
          usuarioId: auth.id,
          libroId: selectedLibro.id,
        },
        config
      );

      console.log(data);

      closeModal();

      Swal.fire("Reserva exitosa", "Libro reservado con éxito", "success");
    } catch (error) {
      console.error(error);
      Swal.fire(
        `Error: ${error.response.data.error}`,
        "Ocurrió un error",
        "error"
      );
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Información del Libro
                </Dialog.Title>
                {selectedLibro && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      <strong>Título:</strong> {selectedLibro.titulo}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Autor:</strong> {selectedLibro.autor}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>ISBN:</strong> {selectedLibro.isbn}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Copias:</strong> {selectedLibro.copias}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Disponibles:</strong> {selectedLibro.disponibles}
                    </p>

                    <button
                      onClick={confirmarReserva}
                      className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Confirmar Reserva
                    </button>
                  </div>
                )}
                <div className="mt-4">
                  <button
                    type="button"
                    className="bg-slate-800 text-white px-4 py-2 rounded-lg"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalReserva;
