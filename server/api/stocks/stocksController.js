

exports.get = (req, res) => {
  console.log('4', req.params);
  //trigger some sort of request here
  res.status(200).send('this is the response from in your stocksController request');

}