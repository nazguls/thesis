const Models = require('./dbModels');

const fakeStockData = require('./fakeData/fakeStockData.json');
const fakeUserData = require('./fakeData/fakeUserData.json');
const fakeTransactions = require('./fakeData/fakeTransactions.json');
const fakeUserTransactionData = require('./fakeData/fakeUserTransactionData.json');
const fakeUserStocksData = require('./fakeData/fakeUserStocksData.json');
const fakePortfolioData = require('./fakeData/fakePortfolioData.json');
const fakeUserPortfolioData = require('./fakeData/fakeUserPortfolioData.json');

console.log(fakeStockData);

Models.User.bulkCreate(fakeUserData, { individualHooks: true })
.then(() => {
  return Models.User.findAll();
});

Models.Portfolio.bulkCreate(fakePortfolioData, { individualHooks: true })
.then(() => {
  return Models.User.findAll();
});

Models.UserPortfolio.bulkCreate(fakeUserPortfolioData, { individualHooks: true })
.then(() => {
  return Models.User.findAll();
});

Models.Stock.bulkCreate(fakeStockData, { individualHooks: true })
.then(() => {
  return Models.User.findAll();
});


Models.Transaction.bulkCreate(fakeTransactions, { individualHooks: true })
.then(() => {
  return Models.User.findAll();
});


Models.UserTransaction.bulkCreate(fakeUserTransactionData, { individualHooks: true })
.then(() => {
  return Models.User.findAll();
});

Models.UserStock.bulkCreate(fakeUserStocksData, { individualHooks: true })
.then(() => {
  return Models.User.findAll();
});