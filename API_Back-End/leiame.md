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

---

🎯 **Agora você está pronto para construir APIs poderosas com Express e Node.js!** 🚀
