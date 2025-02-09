"use strict";

require('dotenv').config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const livros = require("./routes/livrosRoutes");
const swaggerDocs = require("./swagger");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/livros", livros);

app.use((err, req, res, next) => {
 console.error("Erro capturado", err.stack);
 res.status(500).json({ msg: "Erro interno no servidor", err: err.message });
});

app.listen(PORT, () => {
 console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
 console.log(`📄 Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
});
