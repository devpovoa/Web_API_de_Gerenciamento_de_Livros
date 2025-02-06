"use strict";

const express = require('express');
const app = express();
const PORT = 3001;


const log = (req, res, next) => {
 console.log(`${'.'.repeat(20)}Acessado em ${new Date()}`);
 next();
};
// app.use(log);

app.get('/transfere', log, (req, res) => {
 res.send("OK! Valor transferido com sucesso...");
});

app.get('/', (req, res) => {
 res.send("Olá... Bem-vindo!");
});

app.get('/cap12', (req, res) => {
 res.send('<h2>Caítulo 12: Introdução ao Express</h2>')
});

app.use(express.json());
app.post('/filmes', (req, res) => {
 const { titulo, genero } = req.body;

 res.send(`Filmes: ${titulo} - Gênero: ${genero}, recebido...`);
});

app.listen(PORT, () => {
 console.log(`Servidor rodando em http://localhost:${PORT}.`);
});