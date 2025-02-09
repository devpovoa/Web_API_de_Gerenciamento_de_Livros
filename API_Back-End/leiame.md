# 📌 Back-end com Express

O **Express** é um framework para **Node.js** que fornece um conjunto de recursos para o desenvolvimento de aplicações **web** ou **móveis**.

## 🚀 Iniciando o Projeto

Para começar, utilize os seguintes comandos:

```bash
npm init -y
npm install express
```

## 🔄 Configurando o Nodemon

O **Nodemon** é uma ferramenta que reinicia automaticamente o servidor ao detectar mudanças no código.

```bash
npm install -g nodemon
npm install --save-dev nodemon
```

## 📡 Trabalhando com JSON e Métodos HTTP

O **JSON** (_JavaScript Object Notation_) é um formato leve para troca de dados.

### Métodos HTTP Utilizados

```http
GET     # Recupera informações
POST    # Envia dados
PUT     # Atualiza dados
DELETE  # Remove dados
```

### Utilizando `fetch()`

```js
fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(dados)
});
```

### 📦 Pacote `axios`

O `axios` é uma alternativa ao `fetch` para requisições HTTP.

```bash
npm install axios
```

## 🛠 Middlewares

Os **middlewares** atuam como intermediários entre a requisição e a resposta, permitindo modificar os dados ou executar verificações.

Exemplo de middleware:

```js
app.use((req, res, next) => {
  console.log("Middleware em execução");
  next();
});
```

## 🗄 Banco de Dados com Knex e OracleDB

Instale os pacotes necessários:

```bash
npm install knex --save
npm install oracledb
npx knex init
```

### 📌 Criando Tabela `Livros` com Knex

```bash
npx knex migrate:make create_livros
npx knex migrate:latest
```

### 🌱 Seeds: Inserindo Dados Iniciais

```bash
npx knex seed:make 001_add_livros
npx knex seed:run
```

## ⏳ Trabalhando com `async` e `await`

O **Node.js** é assíncrono por natureza. Para um código mais legível, usamos `async` e `await`.

Exemplo:

```js
async function getLivros() {
  const livros = await knex("livros").select("*");
  return livros;
}
```

## 📜 Documentação com Swagger

O **Swagger** é uma ferramenta que facilita a documentação e o teste de APIs.

### 📥 Instalando o Swagger

```bash
npm install swagger-ui-express swagger-jsdoc
```

### 🛠 Configuração do Swagger

Crie um arquivo `swagger.js` e adicione:

```js
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

```

### 🏗 Integrando ao Servidor

No seu arquivo principal (`server.js` ou `index.js`), importe e use a configuração:

```js
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
```

Agora, ao rodar seu servidor, você pode acessar a documentação em `http://localhost:3000/api-docs`.

---

🎯 **Agora você está pronto para construir APIs poderosas com Express, Node.js e Swagger!** 🚀
