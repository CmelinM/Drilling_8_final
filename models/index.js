// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const envConfig = require('../config/db.config').development;

const sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password, {
  host: envConfig.host,
  dialect: envConfig.dialect,
  logging: console.log, 
});

// Importar los modelos
const User = require('./user.model')(sequelize, DataTypes);
const Bootcamp = require('./bootcamp.model')(sequelize, DataTypes);
const user_bootcamp = require('./userbootcamp.model')(sequelize, DataTypes);

// Relaciones entre los modelos
User.belongsToMany(Bootcamp, { through: user_bootcamp, foreignKey: 'user_id' });
Bootcamp.belongsToMany(User, { through: user_bootcamp, foreignKey: 'bootcamp_id' });

module.exports = {
  sequelize,
  User,
  Bootcamp,
  user_bootcamp ,
};
