const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}

const signup = catchAsync(async (req, res, next) => {
    const body = req.body;

    if (!['0', '1', '2'].includes(body.role)) {
        throw new AppError('Invalid role', 400);
    }

    const newUser = await user.create({
        full_name: body.fullName,
        phone_number: body.phoneNumber,
        email: body.email,
        day_of_birth: body.dayOfBirth,
        avatar_url: body.avatarUrl,
        gender: body.gender,
        role: body.role,
        password_hash: body.password,
        confirm_password: body.confirmPassword,
        address: body.address,

    });

    if (!newUser) {
        return next(new AppError('Failed to create user', 400));
    }

    const result = newUser.toJSON();

    delete result.password_hash;
    delete result.deletedAt;

    result.token = generateToken({
        id: result.id,
    });



    return res.status(201).json({
        status: 'success',
        data: result,
    });
}
)

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Email and password are required', 400));
        // return res.status(400).json({
        //     status: 'fail',
        //     message: 'Email and password are required',
        // });
    }

    const result = await user.findOne({ where: { email } });
    if (!result || !await bcrypt.compare(password, result.password_hash)) {
        return next(new AppError('Invalid email or password', 401));
        // return res.status(401).json({
        //     status: 'fail',
        //     message: 'Invalid email or password',
        // });
    }

    const token = generateToken({
        id: result.id,
    });

    return res.status(200).json({
        status: 'success',
        token,
    });
});

const authentication = catchAsync(async (req, res, next) => {
    // 1. get the token from headers
    let idToken = '';
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Bearer asfdasdfhjasdflkkasdf
        idToken = req.headers.authorization.split(' ')[1];
    }
    if (!idToken) {
        return next(new AppError('Please login to get access', 401));
    }
    // 2. token verification
    const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY);
    // 3. get the user detail from db and add to req object
    const freshUser = await user.findByPk(tokenDetail.id);

    if (!freshUser) {
        return next(new AppError('User no longer exists', 400));
    }
    req.user = freshUser;
    return next();
});

const restrictTo = (...role) => {
    const checkPermission = (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return next(
                new AppError(
                    "You don't have permission to perform this action",
                    403
                )
            );
        }
        return next();
    };

    return checkPermission;
};

module.exports = {
    signup,
    login,
    restrictTo,
    authentication,
};