// routes/libroRoutes.js

import { Router } from "express";
import {
  obtenerLibros,
  actualizarLibro,
  eliminarLibro,
} from "../controllers/librosController.js";

import checkAuth from "../middlewares/checkAuth.js";
import { checkRol } from "../middlewares/checkRol.js";

const router = Router();

// Rutas para libros
router.get("/", checkAuth, obtenerLibros);
router.put("/:id", checkAuth, actualizarLibro);
router.delete("/:id", checkAuth, eliminarLibro);

export default router;
