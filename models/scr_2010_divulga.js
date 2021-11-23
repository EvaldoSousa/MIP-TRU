'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scr_2010_divulga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  scr_2010_divulga.init({
    scr_2010_divulga: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'scr_2010_divulga',
  });
  return scr_2010_divulga;
};