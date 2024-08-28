import React, { useState, useEffect, createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
}

interface AuthContextProps {
  auth: Usuario | null;
  setAuth: React.Dispatch<React.SetStateAction<Usuario | null>>;
  cargando: boolean;
  setCargando: React.Dispatch<React.SetStateAction<boolean>>;
  cerrarSesionAuth: () => void;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);


interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  //const navigate = useNavigate(); 

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios.get<Usuario>(
          `${import.meta.env.VITE_API_URL}/usuarios/perfil`,
          config
        );

        setAuth(data);
       // navigate("/dashboard"); 
      } catch (error) {
        console.log(error);
      }

      setCargando(false);
    };

    autenticarUsuario();
  }, []); 

  const cerrarSesionAuth = () => {
    setAuth(null);
    localStorage.removeItem("token");
    //navigate("/login"); 
  };



  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        setCargando,
        cerrarSesionAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
