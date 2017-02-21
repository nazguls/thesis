const axios = require('axios');


const getStockPrice = (ticker) =>
  axios.get('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json', {
    params: {
      symbol: ticker } })
      .then((response) =>
         response.data
      ).catch((err) => console.log(err));

 const getBulkStockPrices = (portfolio) => {
    const holdings = portfolio.map(stock => stock.dataValues.stockSymbol);
    const stocks = [];

    const fetchPrices = (port, counter, results) => {
      if (counter === null) {
        counter = 0;
      } else {
        counter++;
      }
      if (counter === port.length) {
        return results;
      }

      return getStockPrice(port[counter])
        .then(stock => {
          results = results.concat(stock);
          return fetchPrices(port, counter, results);
        });
      };
      return fetchPrices(holdings, null, stocks);
    };

module.exports = { getBulkStockPrices, getStockPrice };
