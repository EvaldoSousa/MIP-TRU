'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class uf_destinatario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  uf_destinatario.init({
    uf_destinatario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'uf_destinatario',
  });
  return uf_destinatario;
};