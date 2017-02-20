const User = require('../../../db/dbModels').User;
const Stock = require('../../../db/dbModels').Stock;
const Portfolio = require('../../../db/dbModels').Portfolio;

exports.transact = (tradeData) => {
  const userId = tradeData.userId;
  if(tradeData.transact === 'buy') {
    return User.findOne({where: {id: userId}})
       .then(user => {
        if(user) {
        return Stock.create({
          stockSymbol: tradeData.stock,
          type:'hold',
          purchaseDate: new Date(),
          purchasePrice: tradeData.price,
          numOfShares: tradeData.shares,
          userID:userId
        })
      }
      })
       .catch(err => console.log(err));
  } else if(tradeData.transact === 'sell') {
    return User.findOne({where: {id: tradeData.userId}}).then((user) => {
      if(user) {
        return Stock.findOne({where: {
          stockSymbol:tradeData.stock,
          userID: tradeData.userId
        }})
          .then(stock => {
            const numShares = stock.numOfShares - tradeData.shares;
            stock.updateAttributes({
              numOfShares:numShares
            })
          })
      }
    })
  }
}

exports.getUser = (username) => {
  return User.findOne({where: {username: username}}).
  catch(err => console.log(err));
}

exports.addUser = (username, userData) => {
  return User.create({
    username: username,
    firstName: userData.firstName,
    lastName: userData.lastName,
    address: userData.address,
    city: userData.city,
    state: userData.state,
    zipCode: userData.zipCode,
    password: userData.password
  }).
  catch(err => console.log(err));
}


