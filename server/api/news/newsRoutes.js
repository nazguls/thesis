const router = require('express').Router();
const news = require('./newsController');

router.route('/:ticker').get(news.get);

module.exports = router;
