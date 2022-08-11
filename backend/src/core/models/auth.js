'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Auth.belongsTo(models.User, { foreignKey: 'userId', as:'users', onDelete : 'CASCADE' });
    }
  }
  Auth.init({
    token: DataTypes.STRING,
    loggedInAt: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Auth',
  });
  return Auth;
};