const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
 definition: {
  openapi: '3.0.0',
  info: {
   title: 'api_back-end',
   version: '1.0.0',
   description: 'Documentação da API usando Swagger',
  },
  servers: [
   {
    url: 'http://localhost:3001',
    description: 'Servidor local',
   },
  ],
 },
 apis: ['./routes/*.js'],

};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
