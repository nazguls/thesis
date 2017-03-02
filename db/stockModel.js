const Sequelize = require('sequelize');
const connection = require('./dbConnect');

const Stock = connection.define('Stock', {
  stockSymbol: Sequelize.STRING,
  type: Sequelize.STRING,
  purchaseDate: Sequelize.DATE,
  purchasePrice: Sequelize.FLOAT,
  numOfShares: Sequelize.BIGINT,
});

module.exports = Stock;
