const Sequelize = require('sequelize');
const connection = require('./dbConnect');
const User = require('./userModel');
const Stock = require('./stockModel');
const Portfolio = require('./portfolioModel');
const Transaction = require('./transactionModel');
const UserStock = require('./userStockModel');
const UserPortfolio = require('./userPortfolioModel');
const UserTransaction = require('./userTransactionModel');
const Spy = require('./spyModel');


User.belongsToMany(Stock, { through: 'UserStocks' });
User.belongsToMany(Portfolio, { through: 'UserPortfolios' });
User.belongsToMany(Transaction, { through: 'UserTransactions' });
connection.sync();


module.exports = {
  User,
  Stock,
  Portfolio,
  Transaction,
  UserStock,
  UserPortfolio,
  UserTransaction,
  Spy,
  connection
};
