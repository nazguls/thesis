const dbHelper = require('../utils/dbHelpers');

exports.get = (req, res) => {
  const email = req.params.email;
  dbHelper.fetchTransactionsHistory(email)
  .then(history => {
    console.log(history);
    res.send(history);
  });
};
