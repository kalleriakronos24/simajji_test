'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transactions.belongsTo(models.Order, { foreignKey : 'orderId', as : 'orders', onDelete : "CASCADE" });
    }
  }
  Transactions.init({
    orderId: DataTypes.INTEGER,
    transferAt: DataTypes.DATE,
    isDoneTransfer: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};