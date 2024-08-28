import { PrismaClient } from "@prisma/client"

const prisma=new PrismaClient()
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos", error);
    process.exit(1);
  }
};

export default connectDB