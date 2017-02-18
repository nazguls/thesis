var Sequelize = require('sequelize');
var connection = require('./dbConnect');

var Stock = connection.define('Stocks', {
  stockSymbol: Sequelize.STRING,
  type: Sequelize.STRING,
  purchaseDate: Sequelize.DATE,
  purchasePrice: Sequelize.FLOAT,
  numOfShares: Sequelize.INTEGER,
});

module.exports = Stock;