module.exports = (sequelize, DataTypes) => {
  const user_bootcamp  = sequelize.define('User_bootcamp', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    bootcamp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Bootcamps',
        key: 'id',
      },
    },
  }, {
    tableName: 'user_bootcamp', //Nombre base de datos
  });

  return user_bootcamp;
};
