const { authentication, restrictTo } = require('../controller/authController');
const { getAllUser, getStoreByOwner } = require('../controller/userController');

const router = require('express').Router();

router.route('/').get(authentication, restrictTo('0'), getAllUser);
router.route('/:id/stores').get(authentication, restrictTo('1'), getStoreByOwner);

module.exports = router;

