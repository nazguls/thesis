//const Sequelize = require('sequelize');
const connection = require('./dbConnect');
const User = require('./userModel');
const Stock = require('./stockModel');
const Portfolio = require('./portfolioModel');

Stock.belongsToMany(User, { through: 'UserStock' });
Portfolio.belongsToMany(User, { through: 'UserPortfolio' });
connection.sync();

module.exports = {
  User,
  Stock,
  Portfolio
};
