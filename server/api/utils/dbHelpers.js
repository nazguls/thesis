const User = require('../../../db/dbModels').User;
const Stock = require('../../../db/dbModels').Stock;
const Portfolio = require('../../../db/dbModels').Portfolio;
const UserStock = require('../../../db/dbModels');
const Transactions = require('../../../db/dbModels').Transaction;
const UserStocks = require('../../../db/dbModels').UserStock;
const UserTransactions = require('../../../db/dbModels').UserTransaction;
const UserPortfolios = require('../../../db/dbModels').UserPortfolio;


//sending price and shares
exports.transact = (tradeData) => {
  console.log(11);
 const shs = tradeData.transact === 'buy' ? tradeData.shares : -tradeData.shares;
 const email = tradeData.email;
 const symbol = tradeData.stock;

  //find the user and update the # of shares
   return User.findOne({ where: { email } })
    .then(user => { 
      Transactions.create({
        date: new Date(),
        type: tradeData.transact,
        symbol,
        purchasePrice: tradeData.price,
        numOfShares: shs
      })
      .then(transaction => 
        UserTransactions.create({
          UserId: user.id,
          TransactionId: transaction.id
        })
      );

      user.getStocks({ where: { stockSymbol: symbol } })
      .then(stock => {
        if (stock[0] !== undefined) {
          let currentShares = parseInt(stock[0].dataValues.numOfShares) + parseInt(shs);
          stock[0].updateAttributes({ numOfShares: currentShares });
        } else {
          console.log('37 -------------');
          Stock.create({
            stockSymbol: symbol,
            type: 'hold',
            purchaseDate: new Date(),
            purchasePrice: tradeData.price,
            numOfShares: tradeData.shares,
          })
          .then(stock => 
            UserStocks.create({
              UserId: user.id,
              StockId: stock.id
            })
          );
        }
      });  
      user.getPortfolios()
      .then(portfolios => {
        console.log('57---------:', portfolios);
        const cash = portfolios[portfolios.length - 1].cash;
        const buyAmount = tradeData.price * shs;
        const newCashBal = cash - buyAmount;
        const newMV = portfolios[portfolios.length - 1].portfolioValue + buyAmount;
        Portfolio.create({
          date: new Date(),
          cash: newCashBal,
          portfolioValue: newMV 
        })
        .then(portfolio =>
          UserPortfolios.create({
            UserId: user.id,
            PortfolioId: portfolio.id
          })
        );
      });
});
};
exports.deposit = (depositData, email) => {
  const type = depositData.type;
  const amount = type === 'WITHDRAWAL' ? -depositData.amount : depositData.amount;
  return User.findOne({ where: { email } })
    .then(user => {
      user.getPortfolios()
        .then(portfolios => {
          const portfolioValue = portfolios[portfolios.length - 1].portfolioValue;
          const cash = portfolios[portfolios.length - 1].cash + amount;
          Portfolio.create({
            date: new Date(),
            cash,
            portfolioValue 
          })
          .then(portfolio =>
            UserPortfolios.create({
              UserId: user.id,
              PortfolioId: portfolio.id
            })
          );
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
  })
  .then((user) => {
    Portfolio.create({
    date: new Date(),
    portfolioValue: 0,
    cash: 10000 
    })
    .then((portfolio) => 
      UserPortfolios.create({
        UserId: user.id,
        PortfolioId: portfolio.id
      })
    );
  })
  .catch(err => console.log(err));

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

