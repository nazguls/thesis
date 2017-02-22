const apiHelper = require('../utils/apiHelpers');
const dbHelper = require('../utils/dbHelpers');

exports.post = (req, res) => {
  let user = req.params.user;
  let depositData = req.body;
  console.log(user);
  console.log(depositData);
  //req.body = {amount: DECIMAL_NUMBER, type:DEPOSIT | WITHDRAWAL}
  //req.params = { user: 'comesm' }
  //console.log(depositData, params, url);
  dbHelper.deposit(depositData, user).then(data =>
  res.send(data));
}
