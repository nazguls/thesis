const axios = require('axios');


exports.getStockPrice = (ticker) =>
  axios.get('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json', {
    params: {
      symbol: ticker } })
      .then((response) =>
        //console.log(response.data);
         response.data

      ).catch((err) => console.log(err));

  exports.getBulkStockPrices = (portfolio) => {
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

      return exports.getStockPrice(port[counter])
        .then(stock => {
          results = results.concat(stock);
          return fetchPrices(port, counter, results);
        });
      };
      return fetchPrices(holdings, null, stocks);
    };

