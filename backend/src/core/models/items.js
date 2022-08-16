'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Items.belongsTo(models.User, { foreignKey: 'userId', as:'users', onDelete : 'CASCADE' })
      Items.hasMany(models.Cart, { foreignKey : 'itemId', as : 'items', onDelete : "CASCADE" });
      Items.hasMany(models.OrderDetails, { foreignKey : 'itemId', as : 'items_orderDetails', onDelete : "CASCADE" });
    }
  }
  Items.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    ratings: DataTypes.FLOAT,
    stocks: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    datePosted: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Items',
  });
  return Items;
};