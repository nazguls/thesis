const money = require('./moneyController');
const router = require('express').Router();

router.route('/:user').post(money.post);


module.exports = router;
