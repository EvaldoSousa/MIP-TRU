'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cfop_3d extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  cfop_3d.init({
    cfop_3d: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cfop_3d',
  });
  return cfop_3d;
};