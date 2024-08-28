import { useContext } from "react";
import BibliotecaContext from "../context/BibliotecaProvider";

const useBiblioteca = () => {
  return useContext(BibliotecaContext);
};

export default useBiblioteca;
