import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { Dashboard } from "./views/Dashboard";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./views/Login";
import { Reservas } from "./views/Reservas";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/biblioteca" element={<Dashboard />} index />
          <Route path="/reservas" element={<Reservas />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
