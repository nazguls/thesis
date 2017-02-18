var Sequelize = require('sequelize');
var connection = require('./dbConnect');

var Portfolio = connection.define('portfolios', {
  date: Sequelize.DATE,
  portfolioValue: Sequelize.FLOAT,
});

module.exports = Portfolio;