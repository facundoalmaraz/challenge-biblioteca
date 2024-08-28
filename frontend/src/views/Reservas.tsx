import React from "react";
import useAuth from "../hooks/useAuth";
import useBiblioteca from "../hooks/useBiblioteca";
import Busqueda from "../components/Busqueda";

export const Reservas = () => {
  const { auth } = useAuth();
  const { reservas } = useBiblioteca();
  console.log(reservas);

  return (
    <>
      {auth?.rol === "ADMIN" ? (
        <h1 className="text-3xl font-bold">Reservas de usuarios</h1>
      ) : (
        <h1 className="text-3xl font-bold">Mis Reservas</h1>
      )}

      <div>
        <p className="text-sm">
          {auth?.rol === "ADMIN"
            ? "Busca las reservas de un usuario"
            : "Busca tus reservas"}
        </p>
        <Busqueda />
      </div>
    </>
  );
};
