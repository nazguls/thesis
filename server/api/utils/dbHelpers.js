const User = require('../../../db/dbModels').User;
const Stock = require('../../../db/dbModels').Stock;
const Portfolio = require('../../../db/dbModels').Portfolio;
const UserStock = require('../../../db/dbModels');
const Transactions = require('../../../db/dbModels').Transaction;
const UserStocks = require('../../../db/dbModels').UserStock;
const UserTransactions = require('../../../db/dbModels').UserTransaction;
const sequelize = require('sequelize');
const Models = require('../../../db/dbModels');



//sending price and shares
exports.transact = (tradeData) => {
  console.log(11);
 const shs = tradeData.transact === 'buy' ? tradeData.shares : -tradeData.shares;
 const email = tradeData.email;
 const symbol = tradeData.stock;

  //find the user and update the # of shares
   return User.findOne({ where: { email } })
    .then(user => { Transactions.create({
        date: new Date(),
        type: tradeData.transact,
        symbol,
        purchasePrice: tradeData.price,
        numOfShares: shs
        }).then(transaction => {
            console.log(user);
            UserTransactions.create({
            UserId: user.id,
            TransactionId: transaction.id
          });

       user.getStocks({ where: { stockSymbol: symbol } })
         .then(stock => {
            if (stock[0] !== undefined) {
              let currentShares = parseInt(stock[0].dataValues.numOfShares) + parseInt(shs);
              stock[0].updateAttributes({ numOfShares: currentShares
              });
         } else {
           Stock.create({
          stockSymbol: symbol,
          type: 'hold',
          purchaseDate: new Date(),
          purchasePrice: tradeData.price,
          numOfShares: tradeData.shares,
          }).then(stock => {
            console.log('user.id --', user.id);
            console.log('stock.id --', stock.id);
            UserStocks.create({
            UserId: user.id,
            StockId: stock.id
            });

             user.getPortfolios()
            .then(portfolios => {
             const cash = portfolios[portfolios.length - 1].cash;
             const buyAmount = tradeData.price * shs;
             const newCashBal = cash - buyAmount;
             const newMV = portfolios[portfolios.length - 1].portfolioValue+ buyAmount;
             portfolios[portfolios.length - 1]
             .updateAttributes({ cash: newCashBal, portfolioValue: newMV });
              })
              });
            };
          });
      });
      });
  }

exports.deposit = (depositData, email) => {
  const type = depositData.type;
  const amount = type === 'WITHDRAWAL' ?
   -depositData.amount : depositData.amount;
   console.log(amount);
  return User.findOne({ where: { email } })
    .then(user => {
      user.getPortfolios()
        .then(portfolios => {
           const cash = portfolios[portfolios.length - 1].cash;
           const newAmount = cash + amount;
           portfolios[portfolios.length - 1]
             .updateAttributes({ cash: newAmount });
        });
    });
};

exports.getUser = (userEmailInput) => {
  const userEmail = userEmailInput.user;
  return User.findOne({ where: { email: userEmail } })
  .catch(err => console.log(err));
 };

exports.addUser = (username, userData) =>
    User.create({
    username,
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    address: userData.address,
    city: userData.city,
    state: userData.state,
    zipCode: userData.zipCode,
    password: userData.password
  }).catch(err => console.log(err));

exports.fetchHoldings = (email) =>
   User.findOne({ where: { email } })
    .then(user => user.getStocks())
    .then(stocks => stocks)
    .catch(err => console.log(err));

exports.getCash = (username) =>
   User.findOne({ where: { username } })
    .then(user => user.getPortfolios())
    .then(portfolios => portfolios)
    .catch(err => console.log(err));

exports.fetchPortfolioHistory = (email) =>
  User.findOne({ where: { email } })
    .then(user => user.getPortfolios({ order: 'date' }))
    .then(portfolios => portfolios)
    .catch(err => console.log(err));


exports.fetchTransactionsHistory = (email) =>
  User.findOne({ where: { email } })
    .then(user => user.getTransactions({ order: 'date desc' }))
    .then(transactions => transactions)
    .catch(err => console.log(err));

exports.fetchAllPortfolioHistory = () =>
  Models.connection.query('SELECT u.username, p.portfolioValue, md.date FROM portfolios AS p INNER JOIN userportfolios  AS up ON up.PortfolioId = p.id INNER JOIN (SELECT up.UserId, MAX(p.date) AS date FROM portfolios AS p INNER JOIN userportfolios as up ON up.PortfolioId = p.id GROUP BY up.UserId) AS md ON p.date = md.date AND up.UserId = md.UserId INNER JOIN users AS u ON u.id = up.UserId;', { bind: ['active'], type: sequelize.QueryTypes.SELECT })
  .then(result => result)
  .catch(err => console.log(err));


