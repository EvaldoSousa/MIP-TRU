'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cnae_divisao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  cnae_divisao.init({
    cnae_divisao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cnae_divisao',
  });
  return cnae_divisao;
};