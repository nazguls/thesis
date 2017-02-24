const Sequelize = require('sequelize');
const connection = require('./dbConnect');
const User = require('./userModel');
const Stock = require('./stockModel');
const Portfolio = require('./portfolioModel');
const UserStock = require('./userStockModel');
const UserPortfolio = require('./userPortfolioModel');

Stock.belongsToMany(User, { through: 'UserStocks' });
Portfolio.belongsToMany(User, { through: 'UserPortfolios' });
connection.sync();

module.exports = {
  User,
  Stock,
  Portfolio,
  UserStock,
  UserPortfolio
};
