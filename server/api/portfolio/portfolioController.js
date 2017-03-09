const dbHelper = require('../utils/dbHelpers');
const fetchPorfolioPrices = require('../utils/apiHelpers').getBulkStockPrices;


exports.get = (req, res) => {
  const email = req.params.email;
  const period = req.query.period;
  if (period === 'historical') {
    dbHelper.fetchPortfolioHistory(email)
      .then(history => res.send(history));
  } else if (period === 'current') {
    dbHelper.fetchHoldings(email)
      .then(holdings =>
        fetchPorfolioPrices(holdings)
      ).then(portfolio => res.send(portfolio));
  }
};

exports.post = (req, res) => {
  console.log('entered in portfolio Get DATA');
  console.log('email', req.params.email);
  const email = req.params.email;

  dbHelper.fetchAllPortfolioHistory(email)
  .then(portfolioData => res.send(portfolioData));
};
