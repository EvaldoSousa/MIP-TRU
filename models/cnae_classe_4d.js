'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cnae_classe_4d extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  cnae_classe_4d.init({
    cnae_classe_4d: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cnae_classe_4d',
  });
  return cnae_classe_4d;
};