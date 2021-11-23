'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class municipio_destinatario_codigo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  municipio_destinatario_codigo.init({
    municipio_destinatario_codigo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'municipio_destinatario_codigo',
  });
  return municipio_destinatario_codigo;
};