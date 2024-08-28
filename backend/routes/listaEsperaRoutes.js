

import { Router } from 'express';
import { inscribirListaEspera } from '../controllers/listaEsperaController.js';

const router = Router();


router.post('/', inscribirListaEspera);

export default router;
