    const jwt = require('jsonwebtoken');
    const config = require('../config/auth.config');

    const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    
    if (!bearerHeader) {
        return res.status(403).json({ message: "No token provided!" });
    }

    try {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        // Agregar log para debug
        console.log('Token recibido:', bearerToken);
        console.log('Secret key:', config.secret);

        const decoded = jwt.verify(bearerToken, config.secret);
        
        // Agregar log para debug
        console.log('Token decodificado:', decoded);
        
        req.userId = decoded.id;
        next();
    } catch (error) {
        // Agregar log para debug
        console.error('Error al verificar token:', error);
        return res.status(401).json({ 
        message: "Unauthorized!",
        error: error.message 
        });
    }
    };

    module.exports = {
    verifyToken
    };