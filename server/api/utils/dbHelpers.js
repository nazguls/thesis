const User = require('../../../db/dbModels').User;
const Stock = require('../../../db/dbModels').Stock;
const Portfolio = require('../../../db/dbModels').Portfolio;
const UserStock = require('../../../db/dbModels');
const Transactions = require('../../../db/dbModels').Transaction;
const UserStocks = require('../../../db/dbModels').UserStock;

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
          }).then(stock => {
            UserStocks.create({
            UserId: user.id,
            StockId: stock.id
            });
            user.getPortfolios()
            .then(portfolios => {
             console.log('45', portfolios);
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
        });
      });
  };
  // date: Sequelize.DATE,
  // type: Sequelize.STRING,
  // symbol: Sequelize.STRING,
  // numOfShares: Sequelize.INTEGER,
  // purchasePrice: Sequelize.FLOAT

// exports.transact1 = (tradeData) => {

//   const userId = tradeData.userId;
//   if (tradeData.transact === 'buy') {
//     return User.findOne({ where: { id: userId } })
//        .then(user => {
//         const buyAmount = tradeData.price * tradeData.shares;
//         const newCashBal = user.cash - buyAmount;
//         user.updateAttributes({ cash: newCashBal });
//         if (user) {
//         return Stock.findOne({ where: {
//           stockSymbol: tradeData.stock,
//           userID: userId }
//         }).then(stock => {
//             if (stock) {
//               const shs = stock.numOfShares + parseInt(tradeData.shares, 10);
//               stock.update({ numOfShares: shs });
//             } else {
//           Stock.create({
//           stockSymbol: tradeData.stock,
//           type: 'hold',
//           purchaseDate: new Date(),
//           purchasePrice: tradeData.price,
//           numOfShares: tradeData.shares,
//           userID: userId
//         });
//         }
//       });
//       }
//     })
//        .catch(err => console.log(err));
//   } else if (tradeData.transact === 'sell') {
//     return User.findOne({ where: { id: tradeData.userId } }).then((user) => {
//       if (user) {
//         const sellAmount = tradeData.price * tradeData.shares;
//         const newCashBal = user.cash + sellAmount;
//         user.updateAttributes({ cash: newCashBal });
//         return Stock.findOne({ where: {
//           stockSymbol: tradeData.stock,
//           userID: tradeData.userId
//         } })
//           .then(stock => {
//             const numShares = stock.numOfShares - parseInt(tradeData.shares, 10);
//             stock.updateAttributes({
//               numOfShares: numShares
//             }).then(holding => {
//               if (holding.numOfShares === 0) {
//                 holding.destroy();
//               }
//           });
//       });
//      }
//     });
//   }
// };

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

exports.getUser = (usernameInput) => {
  const username = usernameInput.user;
  console.log('76', username);
  return User.findOne({ where: { username } })
   //then(user => user)
  .catch(err => console.log(err));
 };

exports.addUser = (username, userData) =>
    User.create({
    username,
    firstName: userData.firstName,
    lastName: userData.lastName,
    address: userData.address,
    city: userData.city,
    state: userData.state,
    zipCode: userData.zipCode,
    password: userData.password
  }).catch(err => console.log(err));


// exports.fetchHoldings = (username) =>
//    User.findOne({ where: { username } })
//     .then(user =>
//        Stock.findAll({ where: { userID: user.id } })
//     )
//     .catch(err => console.log(err));

exports.fetchHoldings = (username) =>
   User.findOne({ where: { username } })
    .then(User => User.getStocks())
    .then(stocks => stocks)
    .catch(err => console.log(err));

exports.getCash = (username) =>
   User.findOne({ where: { username } })
    .then(User => User.getPortfolios())
    .then(portfolios => portfolios)
    .catch(err => console.log(err));



exports.fetchPortfolioHistory = (username) => {
    return Portfolio.findAll({});
};


