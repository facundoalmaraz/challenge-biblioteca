import express from "express";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import reservasRoutes from "./routes/reservasRoutes.js";
import librosRoutes from "./routes/librosRoutes.js";
import listaEspera from "./routes/listaEsperaRoutes.js"
import cors from "cors";
import connectDB from "./config/db.js";

// import usuarioRoutes from './routes/usuarioRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

// Ruta base
app.get("/", () => {
  res.send("Hello World");
});

// Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/reservas", reservasRoutes);
app.use("/api/libros", librosRoutes);
app.use("/api/lista-espera", listaEspera);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
