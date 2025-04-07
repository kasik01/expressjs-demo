const { Sequelize } = require('sequelize');
const user = require('../db/models/user');
const catchAsync = require('../utils/catchAsync');
const store = require('../db/models/store');

const getAllUser = catchAsync(async (req, res, next) => {
    const users = await user.findAndCountAll({
        where: {
            role: {
                [Sequelize.Op.ne]: '0',
            },
        },
        attributes: { exclude: ['password_hash'] },
    });
    return res.status(200).json({
        status: 'success',
        data: users,
    });
});

const getStoreByOwner = catchAsync(async (req, res, next) => {
    const ownerId = req.params.id;
    const result = await store.findAll({ where: { owner_id: ownerId } });
    if (!result) {
        return next(new AppError('Invalid owner id', 400));
    }
    return res.json({
        status: 'success',
        data: result,
    });
});

module.exports = { getAllUser, getStoreByOwner };