const apiHelper = require('../utils/apiHelpers');
const dbHelper = require('../utils/dbHelpers');

exports.post = (req, res) => {

  let body = req.body;
  let params = req.params;
  let url = req.url;
  console.log(body, params, url);

  res.send('success');

}