import express from "express"
import { registrar, autenticar, perfil, inscribirEnListaEspera } from "../controllers/usuarioController.js";
import checkAuth from "../middlewares/checkAuth.js";
const router= express.Router()

router.post("/", registrar);
router.post("/login", autenticar);
router.post('/lista-espera', inscribirEnListaEspera);
router.get("/perfil", checkAuth, perfil)




export default router