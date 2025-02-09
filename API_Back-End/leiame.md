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

**:warning: Caso queira testar a aplicação.**

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

Crie um arquivo `swagger.js` , uma pastar com o arquivo `docs/swagger.json` e adicione:

```js
"use strict";

const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

const swaggerDocument = JSON.parse(
 fs.readFileSync(path.join(__dirname, "docs", "swagger.json"), "utf8")
);

function setupSwagger(app) {
 app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = setupSwagger;

```

---

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "API de Livros",
    "version": "1.0.0",
    "description": "Documentação da API para gerenciamento de livros"
  },
  "servers": [
    {
      "url": "http://localhost:3001",
      "description": "Servidor local"
    }
  ],
  "paths": {
    "/livros": {
      "get": {
        "summary": "Lista todos os livros",
        "tags": ["Livros"],
        "responses": {
          "200": {
            "description": "Lista de livros retornada com sucesso"
          }
        }
      },
      "post": {
        "summary": "Adiciona um novo livro",
        "tags": ["Livros"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["titulo", "autor", "ano", "preco", "foto"],
                "properties": {
                  "titulo": { "type": "string" },
                  "autor": { "type": "string" },
                  "ano": { "type": "integer" },
                  "preco": { "type": "number" },
                  "foto": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "201": { "description": "Livro criado com sucesso" },
          "400": { "description": "Erro nos dados enviados" }
        }
      }
    },
    "/livros/{id}": {
      "put": {
        "summary": "Atualiza um livro (todos os campos)",
        "tags": ["Livros"],
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": { "type": "integer" },
            "description": "ID do livro a ser atualizado"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "titulo": { "type": "string" },
                  "autor": { "type": "string" },
                  "ano": { "type": "integer" },
                  "preco": { "type": "number" },
                  "foto": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Livro atualizado com sucesso" },
          "404": { "description": "Livro não encontrado" }
        }
      },
      "patch": {
        "summary": "Atualiza parcialmente um livro (apenas os campos informados)",
        "tags": ["Livros"],
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": { "type": "integer" },
            "description": "ID do livro a ser atualizado"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "titulo": { "type": "string" },
                  "autor": { "type": "string" },
                  "ano": { "type": "integer" },
                  "preco": { "type": "number" },
                  "foto": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Livro atualizado parcialmente com sucesso" },
          "400": { "description": "Nenhum campo enviado para atualização" },
          "404": { "description": "Livro não encontrado" }
        }
      },
      "delete": {
        "summary": "Exclui um livro",
        "tags": ["Livros"],
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": { "type": "integer" },
            "description": "ID do livro a ser excluído"
          }
        ],
        "responses": {
          "200": { "description": "Livro deletado com sucesso" },
          "404": { "description": "Livro não encontrado" }
        }
      }
    },
    "/livros/{id}/status": {
      "patch": {
        "summary": "Atualiza o status de um livro (ativo ou inativo)",
        "tags": ["Livros"],
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": { "type": "integer" },
            "description": "ID do livro a ser atualizado"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "ativo": { "type": "boolean" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Livro atualizado com sucesso" },
          "400": { "description": "Erro nos dados enviados" },
          "404": { "description": "Livro não encontrado" }
        }
      }
    },
    "/livros/filtro/{palavra}": {
      "get": {
        "summary": "Filtra livros pelo título ou autor",
        "tags": ["Livros"],
        "parameters": [
          {
            "in": "path",
            "name": "palavra",
            "required": true,
            "schema": { "type": "string" },
            "description": "Palavra-chave para busca no título ou autor"
          }
        ],
        "responses": {
          "200": {
            "description": "Lista de livros filtrada com sucesso",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": { "type": "integer" },
                      "titulo": { "type": "string" },
                      "autor": { "type": "string" },
                      "ano": { "type": "integer" },
                      "preco": { "type": "number" },
                      "foto": { "type": "string" }
                    }
                  }
                }
              }
            }
          },
          "400": { "description": "Campo vazio ou palavra inválida." },
          "500": { "description": "Erro interno no servidor." }
        }
      }
    },
    "/livros/dados/resumo": {
      "get": {
        "summary": "Obtém um resumo dos livros",
        "tags": ["Dados"],
        "responses": {
          "200": { "description": "Resumo retornado com sucesso" },
          "404": { "description": "Nenhum dado encontrado" }
        }
      }
    },
    "/livros/dados/grafico": {
      "get": {
        "summary": "Obtém dados para gráfico",
        "tags": ["Dados"],
        "responses": {
          "200": { "description": "Dados retornados com sucesso" },
          "404": { "description": "Nenhum dado encontrado" }
        }
      }
    }
  }
}
```

### 🏗 Integrando ao Servidor

No seu arquivo principal (`server.js` ou `index.js`), importe e use a configuração:

```js
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
```

Agora, ao rodar seu servidor, você pode acessar a documentação em `http://localhost:3000/api-docs`.

---

### 🚀 API em Docker

Esta API foi desenvolvida e configurada para rodar dentro de um container Docker.

### 📌 Requisitos

Antes de começar, certifique-se de ter instalado:

- Docker
- (Opcional) Docker Compose para gerenciar múltiplos containers

🎯 **Agora você está pronto para construir APIs poderosas com Express, Node.js e Swagger!** 🚀
