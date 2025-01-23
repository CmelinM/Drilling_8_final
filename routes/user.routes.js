const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth');

// Ruta pública para crear usuario
router.post('/', userController.createUser);

// Ruta pública para login
router.post('/signin', userController.signin);

// Rutas protegidas - requieren token
router.use(verifyToken);
router.get('/', userController.findAll);
router.get('/:id', userController.findById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router; 