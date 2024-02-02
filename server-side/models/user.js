'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helpers/bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email Must Be Unique",
      },
      validate: {
        notEmpty: {
          msg: "Email Is Required",
        },
        notNull: {
          msg: "Email Is Required",
        },
        isEmail: {
          msg: "Format Email Is Wrong",
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username Is Required",
        },
        notEmpty: {
          msg: "Username Is Required",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlphanumeric: true,
      validate: {
        notNull: {
          msg: "Password Is Required",
        },
        notEmpty: {
          msg: "Password Is Required",
        },
        len: {
          args: 8,
          msg: "The password minimum character password is 8 characters",
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Phone Number Is Required",
        },
        notEmpty: {
          msg: "Phone Number Is Required",
        }
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Address Is Required",
        },
        notEmpty: {
          msg: "Address Is Required",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, option) => {
    user.password = hashPassword(user.password);
  });

  return User;
};