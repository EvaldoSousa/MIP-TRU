'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cfop_2d extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  cfop_2d.init({
    cfop_2d: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cfop_2d',
  });
  return cfop_2d;
};