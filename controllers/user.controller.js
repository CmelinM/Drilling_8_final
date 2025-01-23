    const { User, Bootcamp } = require('../models');
    const bcrypt = require('bcryptjs');
    const jwt = require("jsonwebtoken");
    const config = require("../config/auth.config");

    const userController = {};

    // Crear y guardar un nuevo usuario
    userController.createUser = async (req, res) => {
    try {
        const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
        });
        res.status(201).json({
        message: "Usuario registrado exitosamente!",
        user: user
        });
    } catch (err) {
        res.status(500).json({
        message: err.message || "Error al registrar el usuario."
        });
    }
    };

    // Login de usuario
    userController.signin = async (req, res) => {
    try {
        const user = await User.findOne({
        where: {
            email: req.body.email
        }
        });

        if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado." });
        }

        const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
        );

        if (!passwordIsValid) {
        return res.status(401).json({
            message: "Contraseña inválida!"
        });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration
        });

        res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accessToken: token
        });
    } catch (err) {
        console.error('Error en signin:', err);
        res.status(500).json({
        message: err.message || "Error en el inicio de sesión."
        });
    }
    };

    // Obtener todos los usuarios
    userController.findAll = async (req, res) => {
    try {
        const users = await User.findAll({
        include: [{
            model: Bootcamp,
            as: 'bootcamps'
        }]
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

    // Obtener un usuario por ID
    userController.findById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
        include: [{
            model: Bootcamp,
            as: 'bootcamps'
        }]
        });
        
        if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

    // Actualizar un usuario
    userController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        
        if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        await user.update(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

    // Eliminar un usuario
    userController.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        
        if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        await user.destroy();
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

    module.exports = userController;
