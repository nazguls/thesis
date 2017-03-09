const router = require('express').Router();
const index = require('./indexController');

router.route('/:symbol').get(index.get);
// router.route('/:symbol').post(index.post);


module.exports = router;
