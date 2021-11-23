'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cnae_grupo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  cnae_grupo.init({
    cnae_grupo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cnae_grupo',
  });
  return cnae_grupo;
};