const dbHelper = require('../utils/dbHelpers');
const fetchPorfolioPrices = require('../utils/apiHelpers').getBulkStockPrices;

exports.get = (req, res) => {
  const username = req.params.username;
  const period = req.query.period;
  if (period === 'historical') {
     console.log('historical');
  } else if (period === 'current') {
    dbHelper.fetchHoldings(username)
      .then(holdings =>
       fetchPorfolioPrices(holdings)
      ).then(portfolio => res.send(portfolio));
  }
};

