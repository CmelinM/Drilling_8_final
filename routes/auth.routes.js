const router = require('express').Router();
const authController = require('../controllers/auth.controller');

// Rutas públicas de autenticación
router.post('/signup', authController.signup);  // Registro de nuevo usuario
router.post('/signin', authController.signin);  // Inicio de sesión

module.exports = router; 