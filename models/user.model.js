const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'users',
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(8);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  User.prototype.getSafeInfo = function() {
    const { password, ...safeInfo } = this.toJSON(); 
    return safeInfo;
  };

  User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  User.associate = function(models) {
    User.belongsToMany(models.bootcamps, {
      through: "user_bootcamp",
      as: "bootcamps",
      foreignKey: "user_id"
    });
  };

  return User;
};
