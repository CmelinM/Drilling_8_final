const router = require('express').Router();
const bootcampController = require('../controllers/bootcamp.controller');
const { verifyToken } = require('../middleware/auth');

// Ruta pública para listar bootcamps
router.get('/', bootcampController.getAll);

// Rutas protegidas que requieren autenticación
router.use(verifyToken);
router.get('/:id', bootcampController.findById);
router.post('/', bootcampController.create);
router.put('/:id', bootcampController.update);
router.delete('/:id', bootcampController.delete);
router.post('/adduser', bootcampController.addUser);

module.exports = router; 