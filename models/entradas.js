'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class entradas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  entradas.init({
    ano: DataTypes.INTEGER,
    municipio_emissor: DataTypes.STRING,
    municipio_emissor_codigo: DataTypes.STRING,
    uf_emissor: DataTypes.STRING,
    municipio_destinatario: DataTypes.STRING,
    municipio_destinatario_codigo: DataTypes.STRING,
    uf_destinatario: DataTypes.STRING,
    cfop: DataTypes.STRING,
    desc_cfop: DataTypes.STRING,
    cfop_1d: DataTypes.STRING,
    cfop_2d: DataTypes.STRING,
    cfop_3d: DataTypes.STRING,
    ncm_produto: DataTypes.STRING,
    cnae: DataTypes.STRING,
    desc_cnae: DataTypes.STRING,
    cnae_divisao: DataTypes.STRING,
    cnae_divisao_desc: DataTypes.STRING,
    cnae_grupo: DataTypes.STRING,
    cnae_grupo_desc: DataTypes.STRING,
    cnae_classe_4d: DataTypes.STRING,
    cnae_classe_4d_desc: DataTypes.STRING,
    cnae_classe_5d: DataTypes.STRING,
    cnae_classe_5d_desc: DataTypes.STRING,
    scr_2010_trabalho: DataTypes.STRING,
    scr_2010_trabalho_desc: DataTypes.STRING,
    scr_2010_divulga: DataTypes.STRING,
    scr_2010_divulga_desc: DataTypes.STRING,
    total_bruto_produtos: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'entradas',
  });
  return entradas;
};