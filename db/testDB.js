const Models = require('./dbModels');

Models.User.build({
  username: 'isaac1',
  email: 'Test@test.com',
  firstName: 'isaac',
  lastName: 'yoon',
  cash: 3000,
  address: '123 Sycamore',
  city: 'SF',
  state: 'CA',
  zipCode: '34236'

}).save();
Models.User.build({
  username: 'adamw',
  email: 'Adam@test.com',
  firstName: 'adam',
  lastName: 'watt',
  cash: 4000,
  address: '944 Market',
  city: 'SF',
  state: 'CA',
  zipCode: '34236'

}).save()


Models.Stock.build({
  stockSymbol: 'AAPL',
  type: 'hold',
  purchaseDate: new Date(),
  purchasePrice: 123,
  numOfShares: 10
}).save();

Models.Stock.build({
  stockSymbol: 'MSFT',
  type: 'hold',
  purchaseDate: new Date(),
  purchasePrice: 400,
  numOfShares: 10
}).save();

Models.Stock.build({
  stockSymbol: 'PG',
  type: 'hold',
  purchaseDate: new Date(),
  purchasePrice: 123,
  numOfShares: 10
}).save();

Models.Portfolio.build({
  date: new Date(2017, 1, 18),
  portfolioValue: 1460,
  cash: 3000
}).save();

Models.Portfolio.build({
  date: new Date(2017, 1, 19),
  portfolioValue: 1480,
  cash: 3000
}).save();

Models.Portfolio.build({
  date: new Date(2017, 1, 20),
  portfolioValue: 1532,
  cash: 3000
}).save();

Models.Portfolio.build({
  date: new Date(2017, 1, 21),
  portfolioValue: 1575,
  cash: 3000
}).save();

Models.Portfolio.build({
  date: new Date(2017, 1, 22),
  portfolioValue: 1599,
  cash: 3000
}).save();

Models.Portfolio.build({
  date: new Date(2017, 1, 23),
  portfolioValue: 1638.36,
  cash: 3000
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

Models.UserPortfolio.build({
  UserId: 1,
  PortfolioId: 6
}).save();
