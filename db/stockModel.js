var Sequelize = require('sequelize');
var connection = require('./dbConnect');

var Stock = connection.define('Stocks', {
  stockSymbol: Sequelize.STRING,
  //watch or hold
  type: Sequelize.STRING,
  purchaseDate: Sequelize.DATE,
  purchasePrice: Sequelize.FLOAT,
  numOfShares: Sequelize.INTEGER,
  userID: Sequelize.INTEGER
});

module.exports = Stock;