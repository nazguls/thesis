const dbHelper = require('../utils/dbHelpers');

exports.post = (req, res) => {
  let user = req.params.user;
  let depositData = req.body;
  console.log(user);
  console.log(depositData);
  dbHelper.deposit(depositData, user).then(data =>
  res.send(data));
};

exports.get = (req, res) => {
  const user = req.params.user;
  dbHelper.getCash(user).then(data =>
  res.send(data));
};
