'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate:{
        len: {
          args: 6,
          msg: 'Minimum password length is 6 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};