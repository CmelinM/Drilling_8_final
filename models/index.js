'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/db.config.js');
const db = {};

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Llamar associate si existe
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Cargar modelos
const UserModel = require('./user.model');
const BootcampModel = require('./bootcamp.model');

// Inicializar modelos
const User = UserModel(sequelize, Sequelize.DataTypes);
const Bootcamp = BootcampModel(sequelize, Sequelize.DataTypes);

// Asignar modelos a db
db.User = User;
db.Bootcamp = Bootcamp;

// Definir las relaciones
db.User.belongsToMany(db.Bootcamp, {
  through: "user_bootcamp",
  as: "bootcamps",
  foreignKey: "user_id",
});

db.Bootcamp.belongsToMany(db.User, {
  through: "user_bootcamp",
  as: "users",
  foreignKey: "bootcamp_id",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });

module.exports = db;
