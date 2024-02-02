'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Request.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isNumeric: true,  
      validate: {
        notNull: {
          msg: "User Id Is Required",
        },
        notEmpty: {
          msg: "User Id Is Required",
        },
        isNumeric:{
          msg: "User Id Must Been Number"
        }
      },
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isNumeric: true,  
      validate: {
        notNull: {
          msg: "Item Is Required",
        },
        notEmpty: {
          msg: "Item Is Required",
        },
        isNumeric:{
          msg: "Item Id Must Been Number"
        }
      },
    },
    portion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isNumeric: true,  
      validate: {
        notNull: {
          msg: "Portion Is Required",
        },
        notEmpty: {
          msg: "Portion Is Required",
        },
        isNumeric:{
          msg: "Portion Must Been Number"
        }
      },
    },
    specialRequest: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Special Request Is Required",
        },
        notEmpty: {
          msg: "Special Request Is Required",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};