// routes/reservaRoutes.js

import { Router } from 'express';
import {
  listarReservas,
  buscarReservasPorUsuario,
  crearReserva
} from '../controllers/reservasController.js';

const router = Router();

// Ruta para listar todas las reservas
router.get('/', listarReservas);

// Ruta para buscar reservas por nombre de usuario
router.get('/buscar', buscarReservasPorUsuario);

router.post('/', crearReserva);

export default router;
