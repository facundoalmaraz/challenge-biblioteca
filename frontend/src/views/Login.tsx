import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Biblioteca from "../assets/biblioteca.webp";

interface Alerta {
  msg: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alerta, setAlerta] = useState<Alerta | null>(null);

  const { setAuth } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([correo, password].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios" });
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/usuarios/login`,
        {
          correo,
          password,
        }
      );

      setAlerta(null);
      localStorage.setItem("token", data.token);

      setAuth(data);
      navigate("/biblioteca");
    } catch (error: any) {
      setAlerta({
        msg: error.response?.data?.msg || "Error al iniciar sesión",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-[1100px] md:h-[750px] rounded-3xl overflow-auto shadow-2xl flex mx-5">
        <div className="md:w-1/2 flex md:flex-row flex-col justify-center">
          <div
            className="w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${Biblioteca})` }}
          ></div>
        </div>
        <div className="md:w-1/2 w-full">
          <h1 className="text-center text-2xl font-bold mt-20">
            Iniciar Sesión
          </h1>
          <div className="md:w-full md:px-20 px-10">
            <form onSubmit={handleSubmit}>
              <div className="mt-10 mb-4">
                <label
                  className="text-slate-900 font-semibold text-sm"
                  htmlFor="correo"
                >
                  CORREO
                </label>
                <input
                  id="correo"
                  placeholder="Ingresa tu Email"
                  className="w-full bg-gray-200 placeholder:px-3 p-3 rounded-xl"
                  type="text"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
              <div className="mt-10 mb-4">
                <label
                  className="text-slate-900 font-semibold text-sm"
                  htmlFor="password"
                >
                  PASSWORD
                </label>
                <input
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  className="w-full bg-gray-200 placeholder:px-3 p-3 rounded-xl"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {alerta && <p className="text-xl text-red-500">{alerta.msg}</p>}

              <div className="mt-20 mb-4 flex justify-center">
                <button
                  type="submit"
                  className="bg-slate-800 md:w-1/2 w-full p-3 rounded-xl text-white font-semibold"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
