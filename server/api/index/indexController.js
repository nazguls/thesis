const dbHelper = require('../utils/dbHelpers');


exports.get = (req, res) => {
  console.log('32-------------');
  const period = req.query.period;
  if (period === 'historical') {
    dbHelper.getSPYHistorical()
      .then(data => res.send(data))
      .catch(err => res.status(404).send(err));
  }
  if (period === 'current') {
  dbHelper.getSPYCurrent().then(data =>
    res.status(200).send(data)
  ).catch((err) =>
    res.status(404).send(err)
  );
  }
};
