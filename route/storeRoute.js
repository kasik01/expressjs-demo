const { createStore, getStoreById, updateStore, deleteStore } = require('../controller/storeController');
const { authentication, restrictTo } = require('../controller/authController');

const router = require('express').Router();

router.route('/').post(createStore);

router
    .route('/:id')
    .get(authentication, restrictTo('1'), getStoreById)

module.exports = router;