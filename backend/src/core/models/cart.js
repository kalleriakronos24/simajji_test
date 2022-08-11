'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, { foreignKey: 'userId', as:'users', onDelete : 'CASCADE' });
      Cart.belongsTo(models.Items, { foreignKey: 'itemId', as:'items', onDelete : 'CASCADE' });
    }
  }
  Cart.init({
    itemId: DataTypes.INTEGER,
    qty: DataTypes.NUMBER,
    price: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};