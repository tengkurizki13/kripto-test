"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

  }
  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name is Required" },
          notNull: { msg: "Name is Required" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description is Required" },
          notNull: { msg: "Description is Required" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Price is Required" },
          notNull: { msg: "Price is Required" },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Image Url is Required" },
          notNull: { msg: "Image Url is Required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
