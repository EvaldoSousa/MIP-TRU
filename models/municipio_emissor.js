'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class municipio_emissor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  municipio_emissor.init({
    municipio_emissor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'municipio_emissor',
  });
  return municipio_emissor;
};