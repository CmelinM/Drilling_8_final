    // Sequelize
    require('dotenv').config() // tenemos variables de entorno disponibles

    const { env } = process
    
    const envConfig = {
    "development": {
        "username": env.DB_USER,
        "password": env.DB_PASSWORD,
        "database": env.DB_DATABASE,
        "host": env.DB_HOST,
        "dialect": "postgres",
    },
    JWT_SECRET: env.JWT_SECRET
    }

    module.exports = envConfig