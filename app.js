require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require('express');

const { swaggerDocs, swaggerUi } = require('./swagger/swagger-config');

const authRouter = require('./route/authRoute');
const storeRouter = require('./route/storeRoute');
const userRouter = require('./route/userRoute');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = express();

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// all routes will be here
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/stores', storeRouter);
app.use('/api/v1/users', userRouter);

app.use(
    /(.*)/,
    catchAsync(async (req, res, next) => {
        throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
    })
);

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log('Server up and running', PORT);
    console.log('Swagger at: http://localhost:' + PORT + '/api-docs');
});