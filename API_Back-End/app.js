"use strict";

require('dotenv').config();
const express = require("express");
const cors = require("cors");
const livros = require("./routes/livrosRoutes");
const setupSwagger = require("./swagger");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

setupSwagger(app);

app.use("/livros", livros);

app.use((err, req, res, next) => {
 console.error("Erro capturado", err.stack);
 res.status(500).json({ msg: "Erro interno no servidor", err: err.message });
});

app.listen(PORT, () => {
 console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
 console.log(`📄 Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
});
