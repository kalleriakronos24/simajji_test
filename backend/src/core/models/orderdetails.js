'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetails.belongsTo(models.Order, { foreignKey : 'orderId', as : 'orders', onDelete : "CASCADE" });
    }
  }
  OrderDetails.init({
    orderId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderDetails',
  });
  return OrderDetails;
};