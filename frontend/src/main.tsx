import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Router from "./router.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { BibliotecaProvider } from "./context/BibliotecaProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BibliotecaProvider>
      <Router />
    </BibliotecaProvider>
  </AuthProvider>
);
