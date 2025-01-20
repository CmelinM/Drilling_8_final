const express = require('express');
const { BootcampController } = require('../controllers'); // Asegúrate de la ruta correcta

const router = express.Router();

router.post('/', BootcampController.create); // Crear Bootcamp
router.get('/', BootcampController.getAll); // Listar todos los Bootcamps
router.get('/:id', BootcampController.findById); // Buscar Bootcamp por ID
router.put('/:id', BootcampController.update); // Actualizar Bootcamp
router.delete('/:id', BootcampController.delete); // Eliminar Bootcamp
router.post('/:bootcampId/users/:userId', BootcampController.addUser); // Agregar usuario al Bootcamp



module.exports = router;

