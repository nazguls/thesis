const router = require('express').Router();


router.route('/').get(function(req, res) {

  console.log('test');

    res.sendStatus(200);
  }
);

module.exports = router;

