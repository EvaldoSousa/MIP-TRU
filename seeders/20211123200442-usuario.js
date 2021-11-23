'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios', [{
      nome: 'Teste',
      sobrenome: 'Teste',
      email: 'joathanlopes@hotmail.com',
      nomeusuario: 'teste',
      telefone: '(94)991801299',
      perfil: 1,
      senha: 'teste',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {});
  }
};
