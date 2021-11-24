'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('entrada', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ano: {
        type: Sequelize.INTEGER
      },
      municipio_emissor: {
        type: Sequelize.STRING
      },
      municipio_emissor_codigo: {
        type: Sequelize.STRING
      },
      uf_emissor: {
        type: Sequelize.STRING
      },
      municipio_destinatario: {
        type: Sequelize.STRING
      },
      municipio_destinatario_codigo: {
        type: Sequelize.STRING
      },
      uf_destinatario: {
        type: Sequelize.STRING
      },
      cfop: {
        type: Sequelize.STRING
      },
      desc_cfop: {
        type: Sequelize.STRING
      },
      cfop_1d: {
        type: Sequelize.STRING
      },
      cfop_2d: {
        type: Sequelize.STRING
      },
      cfop_3d: {
        type: Sequelize.STRING
      },
      ncm_produto: {
        type: Sequelize.STRING
      },
      cnae: {
        type: Sequelize.STRING
      },
      desc_cnae: {
        type: Sequelize.STRING
      },
      cnae_divisao: {
        type: Sequelize.STRING
      },
      cnae_divisao_desc: {
        type: Sequelize.STRING
      },
      cnae_grupo: {
        type: Sequelize.STRING
      },
      cnae_grupo_desc: {
        type: Sequelize.STRING
      },
      cnae_classe_4d: {
        type: Sequelize.STRING
      },
      cnae_classe_4d_desc: {
        type: Sequelize.STRING
      },
      cnae_classe_5d: {
        type: Sequelize.STRING
      },
      cnae_classe_5d_desc: {
        type: Sequelize.STRING
      },
      scr_2010_trabalho: {
        type: Sequelize.STRING
      },
      scr_2010_trabalho_desc: {
        type: Sequelize.STRING
      },
      scr_2010_divulga: {
        type: Sequelize.STRING
      },
      scr_2010_divulga_desc: {
        type: Sequelize.STRING
      },
      total_bruto_produtos: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('entrada');
  }
};