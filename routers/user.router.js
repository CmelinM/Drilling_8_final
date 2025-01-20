const express = require('express')
const { UserController } = require('../controllers/user.controller')

const router = express.Router();

router.post('/', UserController.create);
router.get("/", UserController.getAll)
router.put("/:id", UserController.update);
router.delete("/:id", UserController.deleteUser)
router.get("/:id", UserController.findById)
// router.get('/users/:id', UserController.findById); // Consultar un usuario por ID, incluyendo los Bootcamps
// router.get('/users', UserController.getAll); // Listar todos los usuarios con sus Bootcamps


module.exports = router;
