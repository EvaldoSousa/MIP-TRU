'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class municipio_destinatario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  municipio_destinatario.init({
    municipio_destinatario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'municipio_destinatario',
  });
  return municipio_destinatario;
};