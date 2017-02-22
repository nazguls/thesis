const User = require('../../../db/dbModels').User;
const Stock = require('../../../db/dbModels').Stock;


//sending price and shares
exports.transact = (tradeData) => {
  const userId = tradeData.userId;
  if (tradeData.transact === 'buy') {
    return User.findOne({ where: { id: userId } })
       .then(user => {
        const buyAmount = tradeData.price * tradeData.shares;
        const newCashBal = user.cash - buyAmount;
        user.updateAttributes({ cash: newCashBal });
        if (user) {
        return Stock.findOne({ where: {
          stockSymbol: tradeData.stock,
          userID: userId }
        }).then(stock => {
            if (stock) {
              const shs = stock.numOfShares + parseInt(tradeData.shares, 10);
              stock.update({ numOfShares: shs });
            } else {
          Stock.create({
          stockSymbol: tradeData.stock,
          type: 'hold',
          purchaseDate: new Date(),
          purchasePrice: tradeData.price,
          numOfShares: tradeData.shares,
          userID: userId
        });
        }
      });
      }
    })
       .catch(err => console.log(err));
  } else if (tradeData.transact === 'sell') {
    return User.findOne({ where: { id: tradeData.userId } }).then((user) => {
      if (user) {
        const sellAmount = tradeData.price * tradeData.shares;
        const newCashBal = user.cash + sellAmount;
        user.updateAttributes({ cash: newCashBal });
        return Stock.findOne({ where: {
          stockSymbol: tradeData.stock,
          userID: tradeData.userId
        } })
          .then(stock => {
            const numShares = stock.numOfShares - parseInt(tradeData.shares, 10);
            stock.updateAttributes({
              numOfShares: numShares
            }).then(holding => {
              if (holding.numOfShares === 0) {
                holding.destroy();
              }
          });
      });
     }
    });
  }
};

exports.deposit = (depositData, username) => {
  const type = depositData.type;
  const amount = type === 'WITHDRAWAL' ?
   - depositData.amount : depositData.amount;
   console.log(amount);
  return User.findOne({ where: { username } })
    .then(user => {
      const cash = user.cash + amount;
      user.updateAttributes({ cash });
    });
};


exports.getUser = (username) =>
  User.findOne({ where: { username } })
  .catch(err => console.log(err));


exports.addUser = (username, userData) =>
    User.create({
    cash: 0,
    username,
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
    .then(user =>
       Stock.findAll({ where: { userID: user.id } })
    )
    .catch(err => console.log(err));
