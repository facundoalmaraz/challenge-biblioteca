import React, { useState, useEffect, createContext, ReactNode } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";


interface Libro {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  copias: number;
  disponibles: number;
}

interface BibliotecaContextProps {
  libros: Libro[];
  cargando: boolean;
}

const BibliotecaContext = createContext<BibliotecaContextProps | undefined>(
  undefined
);

interface BibliotecaProviderProps {
  children: ReactNode;
}

const BibliotecaProvider: React.FC<BibliotecaProviderProps> = ({
  children,
}) => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [reservas, setReservas] = useState<Libro[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerLibros = async () => {
      setCargando(true);
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

        const { data } = await axios.get<Libro[]>(
          `${import.meta.env.VITE_API_URL}/libros`,
          config
        );

        setLibros(data);
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    };

    obtenerLibros();
  }, [auth]);

  useEffect(() => {
    const obtenerReservas = async () => {
      setCargando(true);
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

        const { data } = await axios.get<Libro[]>(
          `${import.meta.env.VITE_API_URL}/reservas`,
          config
        );

        setReservas(data);
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    };

    obtenerReservas();
  }, []);

  const editarLibro = async (editedLibro: Libro) => {
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

      const { data } = await axios.put<Libro>(
        `${import.meta.env.VITE_API_URL}/libros/${editedLibro.id}`,
        editedLibro,
        config
      );

      setLibros((prevLibros) =>
        prevLibros.map((libro) => (libro.id === data.id ? data : libro))
      );

      Swal.fire(
        "Libro actualizado",
        "El libro ha sido actualizado.",
        "success"
      );
    } catch (error) {
      console.error("Error al editar el libro:", error);
    }
  };

  const eliminarLibro = async (id: number) => {
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

      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(
            `${import.meta.env.VITE_API_URL}/libros/${id}`,
            config
          );
          setLibros((prevLibros) =>
            prevLibros.filter((item) => item.id !== id)
          );
          Swal.fire("Eliminado", "El libro ha sido eliminado.", "success");
        }
      });
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    }
  };

  const cerrarSesionBiblioteca = () => {
    setLibros([]);
    localStorage.removeItem("token");
  };

  return (
    <BibliotecaContext.Provider
      value={{
        libros,
        reservas,
        setReservas,
        cargando,
        editarLibro,
        eliminarLibro,
        cerrarSesionBiblioteca,
      }}
    >
      {children}
    </BibliotecaContext.Provider>
  );
};

export { BibliotecaProvider };
export default BibliotecaContext;
