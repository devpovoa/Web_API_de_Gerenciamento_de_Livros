<div align="center">
<img align="center" alt="Povoa-JavaScript" height="250" width="250" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"/>
  
​![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)
</div>


# 📚 API de Gerenciamento de Livros

## 📝 Descrição

Esta API permite o gerenciamento de um acervo de livros, possibilitando a criação, leitura, atualização e remoção de registros de livros. A API foi desenvolvida utilizando **Node.js**, **Express** e **Knex.js** para manipulação do banco de dados.

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express.js
- Knex.js
- Oracle Database
- Swagger (para documentação)
- Docker

## 📥 Instalação e Configuração

### 1. 🧑‍💻 Clonar o repositório
```bash
git clone https://github.com/devpovoa/Web_API_de_Gerenciamento_de_Livros.git
cd Web_API_de_Gerenciamento_de_Livros
```

### 2. 📦 Instalar dependências

```bash
npm install
```

### 3. 🗃️ Configurar o banco de dados

- Ajuste as configurações no arquivo `db_config.js` conforme o banco utilizado.
- Execute as migrações do banco:

```bash
npx knex migrate:latest
```

### 4. 🚀 Iniciar o servidor

```bash
npm start
```

A API estará rodando em `http://localhost:3001`.

## 📖 Documentação da API

A documentação completa está disponível via Swagger em [`http://localhost:3001/api-docs/`](http://localhost:3001/api-docs/).

## 🛣️ Endpoints da API

### **1. 📜 Listar todos os livros**

- **Método:** `GET`
- **Endpoint:** `/livros`
- **Descrição:** Recupera uma lista de todos os livros ativos no acervo.
- **Resposta de Sucesso (200):**

```json
[
  {
    "id": 1,
    "titulo": "O Nome do Vento",
    "autor": "Patrick Rothfuss",
    "ano": 2007,
    "preco": 39.90,
    "foto": "url_da_imagem",
    "ativo": true
  }
]
```

### **2. ➕ Adicionar um novo livro**

- **Método:** `POST`
- **Endpoint:** `/livros`
- **Parâmetros JSON:**

```json
{
  "titulo": "O Temor do Sábio",
  "autor": "Patrick Rothfuss",
  "ano": 2011,
  "preco": 49.90,
  "foto": "url_da_imagem"
}
```

- **Resposta de Sucesso (201):**

```json
{
  "id": 2
}
```

### **3. ✏️ Atualizar um livro completamente**

- **Método:** `PUT`
- **Endpoint:** `/livros/{id}`
- **Parâmetros JSON:**

```json
{
  "titulo": "Novo Título",
  "autor": "Novo Autor",
  "ano": 2023,
  "preco": 59.90,
  "foto": "nova_url_da_imagem"
}
```

### **4. 🛠️ Atualizar um livro parcialmente**

- **Método:** `PATCH`
- **Endpoint:** `/livros/{id}`
- **Parâmetros JSON:** (enviar apenas os campos a serem alterados)

```json
{
  "preco": 45.90
}
```

### **5. 🔄 Atualizar o status de um livro**

- **Método:** `PATCH`
- **Endpoint:** `/livros/{id}/status`
- **Parâmetro JSON:**

```json
{
  "ativo": true
}
```

### **6. 🗑️ Deletar um livro**

- **Método:** `DELETE`
- **Endpoint:** `/livros/{id}`
- **Resposta de Sucesso (200):**

```bash
{
  "msg": "Livro deletado com sucesso"
}
```

### 🏆 **Contribuições**

Contribuições são bem-vindas! 🎉 Caso queira adicionar soluções, novos desafios ou melhorias:

1. 🍴 Faça um fork do repositório.

2. 🌿 Crie uma nova branch:

   ```bash
   git checkout -b minha-contribuicao
   ```

3. 📝 Adicione suas contribuições e faça um commit:

   ```bash
   git commit -m "Descrição das alterações"
   ```

4. 📤 Envie as alterações para o seu fork:

   ```bash
   git push origin minha-contribuicao
   ```

5. 🔀 Abra um pull request neste repositório.

------

### 🖋️ **Licença**

Este repositório é destinado a fins educacionais e não possui qualquer relação oficial com o autor ou a editora do livro. O conteúdo aqui desenvolvido é baseado no aprendizado extraído do material, respeitando os direitos autorais.

Este projeto está sob a licença [MIT](LICENSE).

------

✨ Bons estudos e mãos à obra! 🚀
