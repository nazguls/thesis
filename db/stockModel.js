const Sequelize = require('sequelize');
const connection = require('./dbConnect');

const Stock = connection.define('Stocks', {
  stockSymbol: Sequelize.STRING,
  //watch or hold
  type: Sequelize.STRING,
  purchaseDate: Sequelize.DATE,
  purchasePrice: Sequelize.FLOAT,
  numOfShares: Sequelize.INTEGER,
  userID: Sequelize.INTEGER
});

module.exports = Stock;
