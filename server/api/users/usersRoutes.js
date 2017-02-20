const router = require('express').Router();
const user = require('./usersController');


router.route('/:user').get(user.get);
router.route('/:user').post(user.post);

module.exports = router;