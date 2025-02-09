"use strict";

require('dotenv').config();
const path = require("path");
const swaggerJsDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 3001;

const swaggerOptions = {
 definition: {
  openapi: "3.0.0",
  info: {
   title: "API de Livros",
   version: "1.0.0",
   description: "Uma API para gerenciar livros",
  },
  servers: [
   {
    url: `http://localhost:${PORT}`,
    description: "Servidor local",
   },
  ],
 },
 apis: [path.resolve(__dirname, "./routes/livrosRoutes.js")],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
