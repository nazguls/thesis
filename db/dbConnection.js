var Sequelize = require('sequelize');
var connection = new Sequelize('cywdb', 'root', '');

var User = connection.define('Users', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zipCode: Sequelize.STRING
});

var Stock = connection.define('Stocks', {
  stockSymbol: Sequelize.STRING,
  type: Sequelize.STRING,
});



var Portfolio = connection.define('Portfolio', {
  purchasePrice: Sequelize.STRING,
  numberOfShares: Sequelize.INTEGER,
});

Stock.belongsToMany(User, {through: 'UserStock'});
Portfolio.hasOne(User);

connection.sync();

module.exports = {
  connection: connection,
  User: User,
  Stock: Stock
};

