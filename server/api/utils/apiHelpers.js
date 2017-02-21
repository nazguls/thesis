const axios = require('axios');


const getStockPrice = (ticker) =>
  axios.get('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json', {
    params: {
      symbol: ticker } })
      .then((response) =>
           response.data
      ).catch((err) => err);

 const getHistoricalPrices = (ticker) => console.log('getHistoricalPrices', ticker);
//   console.log('13');
//   axios.get('http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters', { params: { Symbol: 'AAPL', Normalized: false } })
//     .then(data => console.log('data---------', data))
//     .catch(err => console.log('err----------', err));

// 'http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A365%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22AAPL%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D'

 const getBulkStockPrices = (portfolio) => {
    const holdings = portfolio.map(stock => stock.dataValues.stockSymbol);
    const stocks = [];

    const fetchPrices = (port, counter, results) => {
      let increment = counter;
      let resultArray = results;

      if (increment === null) {
        increment = 0;
      } else {
        increment++;
      }
      if (increment === port.length) {
        return results;
      }
      return getStockPrice(port[increment])
        .then(stock => {
          resultArray = resultArray.concat(stock);
          return fetchPrices(port, increment, resultArray);
        });
      };
      return fetchPrices(holdings, null, stocks);
    };

module.exports = { getBulkStockPrices, getStockPrice, getHistoricalPrices };
