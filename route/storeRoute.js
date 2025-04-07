const { createStore, getStoreById, updateStore, deleteStore } = require('../controller/storeController');
const { authentication, restrictTo } = require('../controller/authController');

const router = require('express').Router();

router
    .route('/')
    .post(authentication, restrictTo('1'), createStore);

router
    .route('/:id')
    .get(authentication, restrictTo('1'), getStoreById)
    .patch(authentication, restrictTo('1'), updateStore)
    .delete(authentication, restrictTo('1'), deleteStore);

module.exports = router;