"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("notification", "created_at");
  },

  async down(queryInterface, Sequelize) {},
};
