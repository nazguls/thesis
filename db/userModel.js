var Sequelize = require('sequelize');
var connection = require('./dbConnect');

var User = connection.define('Users', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zipCode: Sequelize.STRING
});

module.exports = User;