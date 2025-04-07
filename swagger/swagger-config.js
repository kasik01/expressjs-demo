const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'NexLab-Test',
            version: '1.0.0',
            description: 'API documentation v1',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./swagger/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = { swaggerDocs, swaggerUi };
