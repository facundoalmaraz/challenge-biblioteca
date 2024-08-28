import { Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu";

export const AppLayout = () => {
  return (
    <>
      <div className="bg-slate-900 p-10 flex justify-between">
        <div></div>
        <h1 className="text-3xl font-bold text-center text-white">
          Biblioteca de la ciudad
        </h1>

        <NavMenu />
      </div>

      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};
