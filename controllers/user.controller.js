    const { User, Bootcamp } = require('../models');
    const UserController = {}


        // Crear Datos
    UserController.create = async (req, res) => {
        try {
        const user = await User.create(req.body);
        res.status(201).json(user);
        } catch (error) {
        res.status(400).json({ error: error.message });
        }
    };


        // Mostrar Datos
        // UserController.getAll = async (req, res, next) => {
        // try {
        //     const users = await User.findAll({ order: [ [ 'id', 'ASC'] ] })
    
        //     console.log(users.map(user => user.getSafeInfo()))
    
        //     return res.json(users.map(user => user.getSafeInfo()))
        // } catch (err) {
        //     console.log(err)
        //     return res.status(500).json({ message: 'Internal Server Error' })
        // }
        // }

        UserController.getAll = async (req, res) => {
                try {
                const users = await User.findAll({
                    include: [{
                    model: Bootcamp, // Incluye la relación con Bootcamps
                    through: { attributes: [] }, // Excluye la tabla intermedia
                    }],
                });
            
                if (!users.length) {
                    return res.status(404).json({ message: 'No hay usuarios disponibles.' });
                }
            

                console.log(users.map(user => user.getSafeInfo())); 
            
                res.status(200).json(users);
                } catch (error) {
                console.error(error);
                res.status(500).json({ error: error.message });
                }
            };


        // Actualizar Datos

        UserController.update = async (req, res, next) => {
        const data = req.body
        const { id } = req.params
        
        try {
            const user = await User.update(data, { where: { id }, individualHooks: true });
            return res.json(user)
        } catch (err) {
            next(err)
        }
        }
        
        //Eliminar user
        UserController.deleteUser = async (req, res, next) => {
        const { id } = req.params
        try {
            const user = await User.destroy({ where: { id } })
            if (!user) {
            return res.status(404).json({ message: 'Usuario no Encontrado' })
            }
            return res.status(201).json({ message: 'Usuario eliminado' })
        } catch (err) {
            next(err)
        }
        }
        
        //buscar user por id
        UserController.findById = async (req, res, next) => {
        const { id } = req.params
        try {
            const user = await User.findByPk(id)
            if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
            }
            return res.json(user)
        } catch (err) {
            next(err)
        }
        }
        // Consultar un usuario por ID, incluyendo los Bootcamps
        UserController.findById = async (req, res) => {
        try {
            const { id } = req.params;
        
            const user = await User.findByPk(id, {
            include: [{
                model: Bootcamp,
                through: { attributes: [] }, 
            }],
            });
        
            if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
            }
        
            // Retorna el usuario con sus Bootcamps
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
        };
        
        // Listar todos los usuarios con sus Bootcamps
        // UserController.getAllUsers = async (req, res) => {
        // try {
        //     const users = await User.findAll({
        //     include: [{
        //         model: Bootcamp,
        //         through: { attributes: [] }, 
        //     }],
        //     });
        
        //     if (!users.length) {
        //     return res.status(404).json({ message: "No hay usuarios disponibles." });
        //     }
        
        //     // Retorna la lista de usuarios con sus Bootcamps
        //     res.status(200).json(users);
        // } catch (error) {
        //     console.error(error);
        //     res.status(400).json({ error: error.message });
        // }
        // };


        // UserController.getAllUsers = async (req, res) => {
        // try {
        //     const users = await User.findAll({
        //     include: [{ model: Bootcamp }],
        //     });
        //     res.status(200).json(users);
        // } catch (error) {
        //     res.status(400).json({ error: error.message });
        // }
        // };
        

    module.exports = { UserController };
