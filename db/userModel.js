const Sequelize = require('sequelize');
const connection = require('./dbConnect');

const User = connection.define('Users', {
  username: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zipCode: Sequelize.STRING,
  password: Sequelize.STRING
});

module.exports = User;
