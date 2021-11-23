'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ncm_produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ncm_produto.init({
    ncm_produto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ncm_produto',
  });
  return ncm_produto;
};