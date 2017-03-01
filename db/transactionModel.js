const Sequelize = require('sequelize');
const connection = require('./dbConnect');

const Transaction = connection.define('Transactions', {
  date: Sequelize.DATE,
  type: Sequelize.STRING,
  symbol: Sequelize.STRING,
  numOfShares: Sequelize.INTEGER,
  purchasePrice: Sequelize.FLOAT
});

module.exports = Transaction;
