const axios = require('axios');

// http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=AAPL&callback=myFunction

//

exports.getStockPrice = (ticker) => {

  axios.get('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json',
    { params: { symbol:ticker }})
      .then((response) => {
        return response;
      }).catch((err) => console.log(err))
  }