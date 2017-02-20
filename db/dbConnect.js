const Sequelize = require('sequelize');

const connection = new Sequelize('cywdb', 'root', '', { logging: false });

module.exports = connection;
