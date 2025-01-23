    const jwt = require('jsonwebtoken');
    const config = require('../config/auth.config');
    const { User } = require('../models');
    const bcrypt = require('bcryptjs');

    // Registro de nuevo usuario
    exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
        return res.status(400).json({ message: "El email ya está registrado" });
        }

        // Crear el nuevo usuario directamente (el hook se encargará del hash)
        const user = await User.create({
        firstName,
        lastName,
        email,
        password  // El hook beforeCreate hará el hash
        });

        // Log para debug
        console.log('Usuario creado:', {
        email: user.email,
        passwordHash: user.password
        });

        res.status(201).json({
        message: "Usuario registrado exitosamente",
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
        });
    } catch (error) {
        console.error('Error en signup:', error);
        res.status(500).json({
        message: error.message || "Error al registrar el usuario."
        });
    }
    };

    // Login de usuario
    exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ 
        where: { email },
        raw: false  // Importante: necesitamos la instancia del modelo, no un objeto plano
        });
        
        if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Logs para debug
        console.log('Login intento:', {
        email,
        passwordIntentado: password,
        passwordAlmacenado: user.password
        });

        // Usar el método del modelo para validar la contraseña
        const passwordIsValid = await user.validPassword(password);

        // Agregar logs para debug
        console.log('Password válido:', passwordIsValid);

        if (!passwordIsValid) {
        return res.status(401).json({
            message: "Contraseña inválida!"
        });
        }

        const token = jwt.sign(
        { id: user.id },
        config.secret,
        { expiresIn: '1m' }
        );

        res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accessToken: token,
        tokenType: 'Bearer'
        });

    } catch (error) {
        console.error('Error en signin:', error);
        res.status(500).json({
        message: error.message || "Error en el inicio de sesión."
        });
    }
    }; 
