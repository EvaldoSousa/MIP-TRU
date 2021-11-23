'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class uf_emissor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  uf_emissor.init({
    uf_emissor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'uf_emissor',
  });
  return uf_emissor;
};