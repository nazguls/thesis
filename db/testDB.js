var Models = require('./dbModels');

Models.User.build({
  username:'isaac123',
  firstName:'isaac',
  lastName:'yoon',
  cash:3000,
  address:'123 Sycamore',
  city:'SF',
  state:'CA',
  zipCode: '34236'

}).save();

Models.User.build({
  username:'adamw',
  firstName:'adam',
  lastName:'watt',
  cash:4000,
  address:'944 Market',
  city:'SF',
  state:'CA',
  zipCode: '34236'

}).save();

Models.Stock.build({
  stockSymbol: 'AAPL',
  type: 'hold',
  purchaseDate: new Date(),
  purchasePrice: 123,
  numOfShares: 300,
  userID: 1
}).save();

Models.Stock.build({
  stockSymbol: 'MSFT',
  type: 'hold',
  purchaseDate: new Date(),
  purchasePrice: 400,
  numOfShares: 200,
  userID: 1
}).save();

Models.Stock.build({
  stockSymbol: 'PG',
  type: 'hold',
  purchaseDate: new Date(),
  purchasePrice: 123,
  numOfShares: 300,
  userID: 2
}).save();

Models.Stock.build({
  stockSymbol: 'MSFT',
  type: 'hold',
  purchaseDate: new Date(),
  purchasePrice: 400,
  numOfShares: 200,
  userID: 2
}).save();

// Models.Location.build({
//   state: 'TX',
//   city: 'Houston',
//   zipCode: '90210',
//   address: '123 Cherry Lane',
// }).save();