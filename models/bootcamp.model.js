module.exports = (sequelize, DataTypes) => {
  const Bootcamp = sequelize.define('Bootcamp',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'El título es obligatorio' },
        },
      },
      cue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'El CUE debe ser un número entero' },
          min: {
            args: [5],
            msg: 'El CUE debe ser al menos 5',
          },
          max: {
            args: [20],
            msg: 'El CUE no puede ser mayor que 10',
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'La descripción es obligatoria' },
        },
      },
    },
    {
      tableName: 'bootcamps', // Nombre base de datos
    }
  );

  // Asociaciones
  Bootcamp.associate = (models) => {
    console.log("Asociando Bootcamp con User...");
    // Relación muchos a muchos con User
    Bootcamp.belongsToMany(models.User, { through: 'user_bootcamp', foreignKey: 'bootcamp_id',otherKey: 'user_id', });
  };

  return Bootcamp;
};
