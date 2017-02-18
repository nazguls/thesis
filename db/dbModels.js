var Sequelize = require('sequelize');
var connection = require('./dbConnect');
var User = require('./userModel');
var Stock = require('./stockModel');
var Portfolio = require('./portfolioModel');

Stock.belongsToMany(User, {through: 'UserStock'});
Portfolio.belongsToMany(User, {through: 'UserPortfolio'});
connection.sync();

module.exports = {
  User: User,
  Stock: Stock,
  Portfolio: Portfolio
};