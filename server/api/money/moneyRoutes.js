const money = require('./moneyController');
const router = require('express').Router();

router.route('/:user').post(money.post);
router.route('/:user').get(money.get);

module.exports = router;
