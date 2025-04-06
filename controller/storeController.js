const store = require('../db/models/store');
const user = require('../db/models/user');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const createStore = catchAsync(async (req, res, next) => {
    const body = req.body;
    // const owner_id = req.user.id;
    const newStore = await store.create({
        name: body.name,
        phone_number: body.phone_number,
        email: body.email,
        address: body.address,
        owner_id: body.owner_id,
    });

    return res.status(201).json({
        status: 'success',
        data: newStore,
    });
});

const getStoreById = catchAsync(async (req, res, next) => {
    const storeId = req.params.id;
    const result = await store.findByPk(storeId, { include: user });
    if (!result) {
        return next(new AppError('Invalid store id', 400));
    }
    return res.json({
        status: 'success',
        data: result,
    });
});

const updateStore = catchAsync(async (req, res, next) => {
    // const owner_id = req.user.id;
    const storeId = req.params.id;
    const body = req.body;

    const result = await store.findOne({
        where: { id: storeId },
    });

    if (!result) {
        return next(new AppError('Invalid store id', 400));
    }

    result.name = body.name || result.name;
    result.phone_number = body.phone_number || result.phone_number;
    result.email = body.email || result.email;
    result.address = body.address || result.address;

    const updatedResult = await result.save();

    return res.json({
        status: 'success',
        data: updatedResult,
    });
});

const deleteStore = catchAsync(async (req, res, next) => {
    // const owner_id = req.user.id;
    const storeId = req.params.id;
    const body = req.body;

    const result = await project.findOne({
        where: { id: storeId },
    });

    if (!result) {
        return next(new AppError('Invalid project id', 400));
    }

    await result.destroy();

    return res.json({
        status: 'success',
        message: 'Record deleted successfully',
    });
});

module.exports = {
    createStore,
    getStoreById,
    updateStore,
    deleteStore,
};