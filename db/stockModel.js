const Sequelize = require('sequelize');
const connection = require('./dbConnect');

const Stock = connection.define('Stocks', {
  stockSymbol: Sequelize.STRING,
  type: Sequelize.STRING,
  purchaseDate: Sequelize.DATE,
  purchasePrice: Sequelize.FLOAT,
  numOfShares: Sequelize.INTEGER,
});

module.exports = Stock;
