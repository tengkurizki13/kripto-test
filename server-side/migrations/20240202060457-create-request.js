'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isNumeric: true,  
      },
      itemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isNumeric: true,  
      },
      portion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isNumeric: true,  
      },
      specialRequest: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Requests');
  }
};