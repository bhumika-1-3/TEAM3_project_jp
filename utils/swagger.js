const Express = require('express');
const SwaggerUI = require('swagger-ui-express');
const swaggerjsdoc = require('swagger-jsdoc');
const {version} = require('../package.json');
const {Request, Response} = require('express');

const options = swaggerjsdoc.Options = { 
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version: version,
            description: 'API',
        },
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
    apis : ['./../routes/*.js']
};

const specs = swaggerjsdoc(options);

function swaggerDocs(app = Express, port=number) {
    app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(specs));

    app.get('/api-docs.json', (req=Request, res=Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
    });

    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
}   
module.exports =  swaggerDocs;
