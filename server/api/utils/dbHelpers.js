const User = require('../../../db/dbModels').User;
const Stock = require('../../../db/dbModels').Stock;
const Portfolio = require('../../../db/dbModels').Portfolio;



exports.transact = (tradeData) => {
  const userId = tradeData.userId;
  console.log('19 tradeData', tradeData);
  if(tradeData.transact === 'buy') {
    return User.findOne({where: {id: userId}})
       .then(user => {
        return Stock.create({
          stockSymbol: tradeData.stock,
          type:'hold',
          purchaseDate: new Date(),
          purchasePrice: tradeData.price,
          numOfShares: tradeData.shares,
          id:userId
        })
      })
       .catch(err => console.log(err));
  } else if(tradeData.transact === 'sell') {
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


