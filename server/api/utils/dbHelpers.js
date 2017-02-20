const User = require('../../../db/dbModels').User;
const Stock = require('../../../db/dbModels').Stock;

exports.transact = (tradeData) => {
  const userId = tradeData.userId;
  if (tradeData.transact === 'buy') {
    return User.findOne({ where: { id: userId } })
       .then(user => {
        if (user) {
        return Stock.create({
          stockSymbol: tradeData.stock,
          type: 'hold',
          purchaseDate: new Date(),
          purchasePrice: tradeData.price,
          numOfShares: tradeData.shares,
          userID: userId
        });
      }
      })
       .catch(err => console.log(err));
  } else if (tradeData.transact === 'sell') {
    return User.findOne({ where: { id: tradeData.userId } }).then((user) => {
      if (user) {
        return Stock.findOne({ where: {
          stockSymbol: tradeData.stock,
          userID: tradeData.userId
        } })
          .then(stock => {
            const numShares = stock.numOfShares - tradeData.shares;
            stock.updateAttributes({
              numOfShares: numShares
            });
          });
      }
    });
  }
};

exports.getUser = (username) =>
  User.findOne({ where: { username } })
  .catch(err => console.log(err));


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


exports.fetchHoldings = (username) =>
   User.findOne({ where: { username } })
    .then(user =>
       Stock.findAll({ where: { userID: user.id } })
    )
    .catch(err => console.log(err));


