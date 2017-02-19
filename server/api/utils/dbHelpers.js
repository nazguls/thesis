const User = require('../../../db/dbModels').User;
const Stock = require('../../../db/dbModels').Stock;
const Portfolio = require('../../../db/dbModels').Portfolio;



exports.transact = (orderType, tradeData) => {
  //
  const userId = trade.Data.userId;
  console.log('19 orderType', orderType);
  console.log('19 tradeData', tradeData);
  if(orderType === 'buy') {
    return User.findOne({where: {id: userId}})
       .then(user => {return user})
       .catch(err => console.log(err));


  } else if(orderType === 'sell') {

  }

}
