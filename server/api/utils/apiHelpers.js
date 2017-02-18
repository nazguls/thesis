const axios = require('axios');


exports.getStockPrice = (ticker) => {
  console.log('11', ticker);
  return axios.get('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json', {
    params: {
      symbol: ticker}})
      .then((response) => {
        return response.data;
      }).catch((err) => console.log(err))
  }