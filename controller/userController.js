const { Sequelize } = require('sequelize');
const user = require('../db/models/user');
const catchAsync = require('../utils/catchAsync');
const store = require('../db/models/store');

const getAllUser = catchAsync(async (req, res, next) => {
    const search = req.query.phoneNumber || '';
    const roleQuery = req.query.role;

    const whereClause = {
        phone_number: {
            [Sequelize.Op.like]: `%${search}%`,
        },
    };

    // Kiểm tra và thêm role vào whereClause nếu có
    if (roleQuery) {
        // Kiểm tra giá trị roleQuery có hợp lệ không
        const validRoles = ['0', '1'];
        if (!validRoles.includes(roleQuery)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid role value',
            });
        }

        whereClause.role = roleQuery;
    }

    // Tìm kiếm user
    const users = await user.findAndCountAll({
        where: whereClause,
        attributes: { exclude: ['password_hash'] },
    });

    // Trả về kết quả
    return res.status(200).json({
        status: 'success',
        data: users,
    });
});

const getStoreByOwner = catchAsync(async (req, res, next) => {
    const ownerId = req.params.id;
    // const user = req.user;
    // if (user.role === '2') {
    //     return next(new AppError('You are not authorized', 403));
    // }
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