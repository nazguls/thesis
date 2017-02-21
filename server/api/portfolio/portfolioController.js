const dbHelper = require('../utils/dbHelpers');
const fetchPorfolioPrices = require('../utils/apiHelpers').getBulkStockPrices;

exports.get = (req, res) => {
  const username = req.params.username;
  const period = req.query.period;
  if (period === 'historical') {
    //
  } else if (period === 'current') {
    dbHelper.fetchHoldings(username)
      .then(holdings => {
       return fetchPorfolioPrices(holdings);
      }
      ).then(portfolio => {console.log('14', portfolio); res.send(portfolio)});
  }
};
