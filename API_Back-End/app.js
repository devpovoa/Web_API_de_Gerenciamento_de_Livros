"use strict";

const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3001;
const livros = require('./routes/livrosRoutes');

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(cors());

app.use('/livros', livros);

app.use((err, req, res, next) => {
 console.error("Erro capturado", err.stack);
 res.status(500).json({ msg: "Erro interno no servidor", err: err.message });
});

app.listen(PORT, () => {
 console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
 console.log(`📄 Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
});