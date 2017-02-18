const axios = require('axios');

// http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=AAPL&callback=myFunction

//

exports.getStockPrice = (ticker) => {
  axios.get('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=AAPL')
      .then((response) => {
        console.log('response', response.data);
        return response.data;
      }).catch((err) => console.log('dondondon'))
  }