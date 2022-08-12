'use strict';
const { DataTypes } = require("Sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transactionId: {
        type: Sequelize.STRING
      },
      totalPrice: {
        type: Sequelize.INTEGER
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      shippingAddress: {
        type: Sequelize.STRING
      },
      isSuccessTransaction: {
        type: Sequelize.BOOLEAN
      },
      orderAt: {
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Users',
          key:'id'
        }
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
    await queryInterface.dropTable('Orders');
  }
};