var Models = require('./dbModels');

Models.User.build({
  username:'isaac1',
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
  numOfShares: 10,
  userID: 1
}).save();

Models.Stock.build({
  stockSymbol: 'MSFT',
  type: 'hold',
  purchaseDate: new Date(),
  purchasePrice: 400,
  numOfShares: 10,
  userID: 1
}).save();

Models.Stock.build({
  stockSymbol: 'PG',
  type: 'hold',
  purchaseDate: new Date(),
  purchasePrice: 123,
  numOfShares: 10,
  userID: 2
}).save();

Models.Stock.build({
  stockSymbol: 'MSFT',
  type: 'hold',
  purchaseDate: new Date(),
  purchasePrice: 400,
  numOfShares: 10,
  userID: 2
}).save();

Models.Portfolio.build({
  date: new Date(2017, 1, 18),
  portfolioValue: 5230
}).save();

Models.Portfolio.build({
  date: new Date(2017, 1, 19),
  portfolioValue: 5300
}).save();

Models.Portfolio.build({
  date: new Date(2017, 1, 20),
  portfolioValue: 5600
}).save();

Models.Portfolio.build({
  date: new Date(2017, 1, 21),
  portfolioValue: 5700
}).save();

Models.Portfolio.build({
  date: new Date(2017, 1, 22),
  portfolioValue: 6000
}).save();

Models.UserStock.build({
  UserId: 1,
  StockId: 1
}).save();

Models.UserStock.build({
  UserId: 1,
  StockId: 3
}).save();

Models.UserStock.build({
  UserId: 2,
  StockId: 2
}).save();

Models.UserStock.build({
  UserId: 2,
  StockId: 4
}).save();

Models.UserPortfolio.build({
  UserId: 1,
  PortfolioId: 1
}).save();

Models.UserPortfolio.build({
  UserId: 1,
  PortfolioId: 2
}).save();

Models.UserPortfolio.build({
  UserId: 1,
  PortfolioId: 3
}).save();

Models.UserPortfolio.build({
  UserId: 1,
  PortfolioId: 4
}).save();

Models.UserPortfolio.build({
  UserId: 1,
  PortfolioId: 5
}).save();

