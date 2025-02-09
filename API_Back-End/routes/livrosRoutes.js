"use strict";

const express = require('express');
const router = express.Router();
const dbKnex = require('../data/db_config');

/**
 * @swagger
 * tags:
 *   name: Livros
 *   description: Gerenciamento de livros
 */

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso
 */
router.get('/', async (req, res) => {
 try {
  const livros = await dbKnex('livros').select().where('ativo', true).orderBy('id', 'desc');
  res.status(200).json(livros);
 } catch (err) {
  console.error("Erro ao acessar o banco de dados:", err);
  res.status(500).json({ msg: "Erro interno no servidor" });
 }
});

/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Adiciona um novo livro
 *     tags: [Livros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - autor
 *               - ano
 *               - preco
 *               - foto
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               ano:
 *                 type: integer
 *               preco:
 *                 type: number
 *               foto:
 *                 type: string
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       400:
 *         description: Erro nos dados enviados
 */
router.post('/', async (req, res) => {
 const { titulo, autor, ano, preco, foto } = req.body;

 if (!titulo || !autor || !ano || isNaN(ano) || !preco || isNaN(preco) || !foto) {
  return res.status(400).json({ msg: "Campos inválidos ou ausentes" });

 };

 try {
  const novo = await dbKnex('livros').insert({ titulo, autor, ano, preco, foto });
  res.status(201).json({ id: novo[0] });
 } catch (err) {
  console.error("Erro ao acessar o banco de dados:", err);
  res.status(500).json({ msg: "Erro interno no servidor" });
 };
});

/**
 * @swagger
 * /livros/{id}:
 *   put:
 *     summary: Atualiza um livro (todos os campos)
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               ano:
 *                 type: integer
 *               preco:
 *                 type: number
 *               foto:
 *                 type: string
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.put('/:id', async (req, res) => {
 const { id } = req.params;
 const { titulo, autor, ano, preco, foto } = req.body;

 if (!titulo && !autor && !ano && !preco && !foto) {
  return res.status(400).json({ msg: "Todos os campos devem ser preenchidos." });
 };

 try {
  const alteracao = await dbKnex('livros').where({ id }).update({ titulo, autor, ano, preco, foto });

  alteracao ? res.status(200).json({ msg: "Livro atualizado com sucesso" }) : res.status(404).json({ msg: "Livro não encontrado" });
 } catch (err) {
  console.error("Erro ao acessar o banco de dados:", err);
  res.status(500).json({ msg: "Erro interno no servidor" });
 };
});

/**
 * @swagger
 * /livros/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um livro (apenas os campos informados)
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               ano:
 *                 type: integer
 *               preco:
 *                 type: number
 *               foto:
 *                 type: string
 *     responses:
 *       200:
 *         description: Livro atualizado parcialmente com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.patch('/:id', async (req, res) => {
 const { id } = req.params;
 const dadosAtualizados = req.body;

 if (Object.keys(dadosAtualizados).length === 0) {
  return res.status(400).json({ msg: "Envie pelo menos um campo para atualização." });
 };

 try {
  const alteracaoUnica = await dbKnex('livros').where({ id }).update(dadosAtualizados);

  alteracaoUnica ? res.status(200).json({ msg: "Livro atualizado com sucesso" }) : res.status(404).json({ msg: "Livro não encontrado" });
 } catch (err) {
  console.error("Erro ao acessar o banco de dados:", err);
  res.status(500).json({ msg: "Erro interno no servidor" });
 };
});

/**
 * @swagger
 * /livros/{id}/status:
 *   patch:
 *     summary: Atualiza o status de um livro (ativo ou inativo)
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ativo:
 *                 type: boolean
 *                 description: "Indica se o livro deve ser ativado ou inativado"
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       400:
 *         description: Dados inválidos (falta o campo 'ativo')
 *       404:
 *         description: Livro não encontrado
 */
router.patch('/:id/status', async (req, res) => {
 const { id } = req.params;
 const { ativo } = req.body;

 if (typeof ativo !== 'boolean') {
  return res.status(400).json({ msg: "'ativo' deve ser um valor booleano" });
 }

 try {
  const updated = await dbKnex('livros')
   .where({ id })
   .update({ ativo });

  if (updated) {
   const status = ativo ? 'reativado' : 'inativado';
   res.status(200).json({ msg: `Livro ${status} com sucesso` });
  } else {
   res.status(404).json({ msg: "Livro não encontrado" });
  }
 } catch (err) {
  console.error("Erro ao acessar o banco de dados:", err);
  res.status(500).json({ msg: "Erro interno no servidor" });
 }
});


/**
 * @swagger
 * /livros/{id}:
 *   delete:
 *     summary: Exclui um livro
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro a ser excluído
 *     responses:
 *       200:
 *         description: Livro deletado com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.delete('/:id', async (req, res) => {
 const { id } = req.params;

 try {
  const deletar = await dbKnex('livros').where({ id }).del();

  deletar ? res.status(200).json({ msg: "Livro atualizado com sucesso" }) : res.status(404).json({ msg: "Livro não encontrado" });
 } catch (err) {
  console.error("Erro ao acessar o banco de dados:", err);
  res.status(500).json({ msg: "Erro interno no servidor" });
 }
});

module.exports = router;