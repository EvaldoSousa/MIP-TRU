'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class municipio_emissor_codigo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  municipio_emissor_codigo.init({
    municipio_emissor_codigo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'municipio_emissor_codigo',
  });
  return municipio_emissor_codigo;
};