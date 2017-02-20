var Sequelize = require('sequelize');
var connection = new Sequelize('cywdb', 'root', '', {logging:false});

module.exports = connection;
