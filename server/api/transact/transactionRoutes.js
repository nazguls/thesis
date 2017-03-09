const router = require('express').Router();
const transaction = require('./transactionController');

router.route('/:email').get(transaction.get);

module.exports = router;
