const apiHelper = require('../utils/apiHelpers');
const dbHelper = require('../utils/dbHelpers');

exports.post = (req, res) => {
  let user = req.params.user;
  let depositData = req.body;
  //req.body = {amount: DECIMAL_NUMBER, type:DEPOSIT | WITHDRAWAL}
  //req.params = { user: 'comesm' }
  console.log(body, params, url);
  dbHelper.deposit(depositData, user).then(data =>
  res.send('success', data));

}