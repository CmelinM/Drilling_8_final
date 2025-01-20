const { Bootcamp, User } = require('../models');

const BootcampController = {};

// Crear y guardar un nuevo Bootcamp
BootcampController.create = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json(bootcamp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los Bootcamps, incluyendo los usuarios
BootcampController.getAll = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({
      include: [{ model: User }], 
    });

    if (!bootcamps.length) {
      return res.status(404).json({ message: 'No hay Bootcamps disponibles.' });
    }

    res.status(200).json(bootcamps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un Bootcamp por ID, incluyendo los usuarios
BootcampController.findById = async (req, res) => {
  try {
    const { id } = req.params;

    const bootcamp = await Bootcamp.findByPk(id, {
      include: [{ model: User }], 
    });

    if (!bootcamp) {
      return res.status(404).json({ message: 'Bootcamp no encontrado.' });
    }

    res.status(200).json(bootcamp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Actualizar un Bootcamp
BootcampController.update = async (req, res) => {
  try {
    const { id } = req.params;
    const bootcamp = await Bootcamp.findByPk(id);

    if (!bootcamp) {
      return res.status(404).json({ message: "Bootcamp no encontrado." });
    }

    await bootcamp.update(req.body);
    res.status(200).json(bootcamp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un Bootcamp
BootcampController.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const bootcamp = await Bootcamp.findByPk(id);
    if (!bootcamp) {
      return res.status(404).json({ message: 'Bootcamp no encontrado.' });
    }

    await bootcamp.destroy(); 
    res.status(200).json({ message: 'Bootcamp eliminado con éxito.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Agregar un Usuario al Bootcamp
BootcampController.addUser = async (req, res) => {
  try {
    const { bootcampId, userId } = req.params;

    const bootcamp = await Bootcamp.findByPk(bootcampId);
    const user = await User.findByPk(userId);

    if (!bootcamp || !user) {
      return res.status(404).json({ message: "Bootcamp o Usuario no encontrado." });
    }

    await bootcamp.addUser(user);
    res.status(200).json({ message: "Usuario agregado al Bootcamp con éxito" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Consultar un usuario por ID, incluyendo los Bootcamps
BootcampController.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [{ model: Bootcamp }],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todos los usuarios con sus Bootcamps
BootcampController.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Bootcamp }],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = BootcampController;