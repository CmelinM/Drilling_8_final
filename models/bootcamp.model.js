module.exports = (sequelize, DataTypes) => {
  const Bootcamp = sequelize.define("bootcamps", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 5,
        max: 20
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'bootcamps'
  });

  Bootcamp.associate = function(models) {
    Bootcamp.belongsToMany(models.users, {
      through: "user_bootcamp",
      as: "users",
      foreignKey: "bootcamp_id"
    });
  };

  return Bootcamp;
};
