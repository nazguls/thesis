const utility = require('../utils/helpers.js')


exports.post = (req, res) => {

  console.log('stock post request');

}


exports.get = (req, res) => {

  //console.log('request', req.query);

  if(req.query === 'historical') {

    //get historical portfolio values
  } else if(req.query === 'current') {
    //get userId

    //get list of users stocks from the databases
    //and their prices
  }


    //else if(
  // )
  //trigger some sort of request here
  // res.status(200).send('this is the response from in your portfolio request');
};