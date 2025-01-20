module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre es obligatorio' },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El apellido es obligatorio' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'El correo ya está registrado' },
      validate: {
        isEmail: { msg: 'El correo no tiene un formato válido' },
        notEmpty: { msg: 'El correo es obligatorio' },
      },
    },
  }, {
    tableName: 'users',  // Nombre base de datos
  });

  User.prototype.getSafeInfo = function() {
    const { password, ...safeInfo } = this.toJSON(); 
    return safeInfo;
  };

  User.associate = (models) => {
    // Relación muchos a muchos con Bootcamp
    console.log("Asociando User con Bootcamp...");
    User.belongsToMany(models.Bootcamp, { through: 'user_bootcamp', foreignKey: 'user_id', otherKey: 'bootcamp_id' });
  };

  return User;
};
