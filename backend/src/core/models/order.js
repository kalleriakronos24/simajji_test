'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: 'userId', as:'users', onDelete : 'CASCADE' })
      Order.hasMany(models.OrderDetails, { foreignKey : 'orderId', as : 'orders', onDelete : "CASCADE" });
      
    }
  }
  Order.init({
    transactionId: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER,
    paymentMethod: DataTypes.STRING,
    shippingAddress: DataTypes.STRING,
    isSuccessTransaction: DataTypes.BOOLEAN,
    orderAt: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};