import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const token = localStorage.getItem("token");
  return (
    <>
 {!token ? <Navigate to="/" /> : null}
      <main className="bg-gradient-to-r from-slate-900 to-slate-800 min-h-screen">
       
          <Outlet />
        
      </main>



    </>
  );
};

export default AuthLayout;
