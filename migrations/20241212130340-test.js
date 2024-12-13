'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('notification', 'created_at', {
      type: 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP'
    })
  },

  async down (queryInterface, Sequelize) {
  }
};
