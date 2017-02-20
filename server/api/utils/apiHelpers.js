const axios = require('axios');


exports.getStockPrice = (ticker) => {
  console.log('11', ticker);
  return axios.get('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json', {
    params: {
      symbol: ticker } })
      .then((response) => {
        console.log(response);
        return response.data;
      }).catch((err) => console.log(err));
  };

  // exports.getBulkStockPrices = (portfolio) =>
    // portfolio.forEach(stock => {
    // const ticker = stock.symbol;
    // exports.getStockPrice(ticker);
    // });
 // };
    //return portfolio;



   // { id: 2,
   //     stockSymbol: 'aapl',
   //     type: 'hold',
   //     purchaseDate: 2017-02-20T01:55:59.000Z,
   //     purchasePrice: 123,
   //     numOfShares: 400,
   //     userID: 2,
   //     createdAt: 2017-02-20T01:55:59.000Z,
   //     updatedAt: 2017-02-20T02:20:34.000Z }