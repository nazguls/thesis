const User = require('../../../db/dbModels').User;
const Stock = require('../../../db/dbModels').Stock;
const Portfolio = require('../../../db/dbModels').Portfolio;
<<<<<<< HEAD
const UserStock = require('../../../db/dbModels');
const Transactions = require('../../../db/dbModels').Transaction;
const UserStocks = require('../../../db/dbModels').UserStock;
=======
>>>>>>> add email to addUser

//sending price and shares
exports.transact = (tradeData) => {
 const shs = tradeData.transact === 'buy' ? tradeData.shares :
-tradeData.shares;
 const userId = tradeData.userId;
 const symbol = tradeData.stock;
 console.log('9', tradeData);
  Transactions.create({
   date: new Date(),
   type: tradeData.transact,
   symbol,
   purchasePrice: tradeData.price,
   numOfShares: shs
  });
   return User.findOne({ userId })
    .then(user => {
       user.getStocks({ where: { stockSymbol: symbol } })
         .then(stock => {
            if (stock[0] !== undefined) {
              const currentShares = stock[0].dataValues.numOfShares + shs;
              stock[0].updateAttributes({ numOfShares: currentShares
              });
         } else {
           Stock.create({
          stockSymbol: symbol,
          type: 'hold',
          purchaseDate: new Date(),
          purchasePrice: tradeData.price,
          numOfShares: tradeData.shares,
          });
            UserStocks.create({
            UserId: user.id,
            StockId: stock.id
            });
          }
             user.getPortfolios()
            .then(portfolios => {
             const cash = portfolios[portfolios.length - 1].cash;
             const buyAmount = tradeData.price * shs;
             const newCashBal = cash - buyAmount;
             const newMV = portfolios[portfolios.length - 1].portfolioValue
               + buyAmount;
             portfolios[portfolios.length - 1]
             .updateAttributes({ cash: newCashBal, portfolioValue: newMV });
              });
            });
          }
        );
      };

exports.deposit = (depositData, username) => {
  const type = depositData.type;
  const amount = type === 'WITHDRAWAL' ?
   -depositData.amount : depositData.amount;
   console.log(amount);
  return User.findOne({ where: { username } })
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

exports.fetchHoldings = (username) =>
   User.findOne({ where: { username } })
    .then(user => user.getStocks())
    .then(stocks => stocks)
    .catch(err => console.log(err));

exports.getCash = (username) =>
   User.findOne({ where: { username } })
    .then(user => user.getPortfolios())
    .then(portfolios => portfolios)
    .catch(err => console.log(err));

exports.fetchPortfolioHistory = (username) => {
  return Portfolio.findAll({});
};
