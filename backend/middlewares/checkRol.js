export const checkRol = async (req, res, next) => {
    const { rol } = req.usuario; 
  console.log(rol)
  
    if (rol !== 'ADMIN') {
      return res.status(403).json({ error: 'Acceso denegado: se requiere rol de administrador' });
    }
  
    next();
  };