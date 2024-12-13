"use strict";

const { date } = require('zod');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      surname:{
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      access_type: {
        type: Sequelize.ENUM('USER', 'ADMIN'),
        allowNull: false,
        defaultValue: 'USER'
      },
      is_email_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    })
    await queryInterface.createTable("category", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })

    await queryInterface.createTable("item", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      count: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
      },
      category_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: 'category',
          key: "id",
        },
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      created_at: {
        type: 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP'
      },
      photo:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
    })

    await queryInterface.createTable("cart", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "user",
          key: "id",
        },
        allowNull: false,
      },
      item_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
         model: "item",
          key: "id",
        },
        allowNull: false,
      },
      count: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      }
    })

    await queryInterface.createTable("notification", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "user",
          key: "id",
        },
        allowNull: false,
      },
      type_of_notice: {
        type: Sequelize.ENUM('PASSWORD_RESET', 'EMAIL_VERIFICATION'),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DataTypes.TIME,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
  },
};
