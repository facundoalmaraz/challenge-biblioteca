import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  copias: number;
  disponibles: number;
}

interface ModalEditarProps {
  isEditOpen: boolean;
  closeModal: () => void;
  editedLibro: Partial<Libro>;
  handleEditChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleEditar: () => void;
}

const ModalEditar: React.FC<ModalEditarProps> = ({
  isEditOpen,
  closeModal,
  editedLibro,
  handleEditChange,
  handleEditar,
}) => {
  return (
    <Transition appear show={isEditOpen} as={Fragment}>
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
                  Editar Información del Libro
                </Dialog.Title>
                {editedLibro && (
                  <div className="mt-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Título
                      </label>
                      <input
                        type="text"
                        name="titulo"
                        value={editedLibro.titulo || ""}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Autor
                      </label>
                      <input
                        type="text"
                        name="autor"
                        value={editedLibro.autor || ""}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        ISBN
                      </label>
                      <input
                        type="text"
                        name="isbn"
                        value={editedLibro.isbn || ""}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Copias
                      </label>
                      <input
                        type="number"
                        name="copias"
                        value={editedLibro.copias || ""}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Disponibles
                      </label>
                      <input
                        type="number"
                        name="disponibles"
                        value={editedLibro.disponibles || ""}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                      />
                    </div>

                    <button
                      onClick={handleEditar}
                      className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Confirmar Edición
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

export default ModalEditar;
