"use strict";

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;
const livros = require('./routes/livrosRoutes');

app.use(express.json());
app.use(cors());
app.use('/livros', livros);

app.use((err, req, res, next) => {
 console.error(err.stack);
 res.status(500).json({ msg: "Erro interno no servidor" });
});

app.listen(PORT, () => {
 console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});