import React, { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import axios from "axios";
import useBiblioteca from "../hooks/useBiblioteca";
import useAuth from "../hooks/useAuth";

interface Reserva {
  id: number;
  libro: {
    titulo: string;
  };
  usuario: {
    nombre: string;
  };
  creadoEn: string;
}

const Busqueda: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { reservas, setReservas } = useBiblioteca();
  const { auth } = useAuth();
  console.log(auth);


  const searchReservas = async (nombre: string) => {
    setLoading(true);
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

      const { data } = await axios.get<Reserva[]>(
        `${import.meta.env.VITE_API_URL}/reservas/buscar?nombre=${nombre}`,
        config
      );

      setReservas(data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setReservas([]);
      } else {
        console.error("Error al buscar reservas:", error);
      }
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    if (auth?.rol !== "ADMIN") {
      searchReservas(auth?.nombre);
    }
  }, [auth]);

  return (
    <div className="w-full">
      {auth?.rol === "ADMIN" ? (
        <div className="flex justify-center">
          <Combobox
            as="div"
            value={query}
            onChange={setQuery}
            className="w-3/4"
          >
            <div className="flex w-full">
              <Combobox.Input
                className="flex-grow p-2 border rounded-l"
                onChange={(e) => setQuery(e.target.value)}
                displayValue={(value: string) => value}
                placeholder="Buscar por nombre de usuario..."
              />
              <button
                onClick={() => searchReservas(query)}
                className="bg-slate-800 text-white px-4 py-2 rounded-r"
              >
                Buscar
              </button>
            </div>
          </Combobox>
        </div>
      ) : null}

      {loading && (
        <p className="mt-2 text-sm text-gray-500 text-center">Buscando...</p>
      )}

      {reservas.length > 0 ? (
        <table className="table-fixed w-full md:w-3/4 mx-auto text-left mt-4">
          <thead className="uppercase bg-slate-800 text-[#e5e7eb]">
            <tr>
              <td className="py-1 text-center p-4">ID</td>
              <td className="py-1 text-center p-4">Libro</td>
              <td className="py-1 text-center p-4">Usuario</td>
              <td className="py-1 text-center p-4">Reservado el</td>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-500">
            {reservas.map((reserva) => (
              <tr key={reserva.id} className="py-5">
                <td className="py-5 text-center p-4">{reserva.id}</td>
                <td className="py-5 text-center p-4">{reserva.libro.titulo}</td>
                <td className="py-5 text-center p-4">
                  {reserva.usuario.nombre}
                </td>
                <td className="py-5 text-center p-4">
                  {reserva.creadoEn.slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && (
          <p className="mt-4 text-center text-sm text-gray-500">
            No se encontraron reservas para "
            {auth?.rol === "ADMIN" ? query : auth?.nombre}".
          </p>
        )
      )}
    </div>
  );
};

export default Busqueda;
