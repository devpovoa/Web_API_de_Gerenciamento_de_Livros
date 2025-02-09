"use strict";

const express = require('express');
const router = express.Router();
const dbKnex = require('../data/db_config');


router.get('/', async (req, res) => {
 try {
  const livros = await dbKnex('livros').select().where('ativo', true).orderBy('id', 'desc');
  res.status(200).json(livros);
 } catch (err) {
  console.error("Erro ao acessar o banco de dados:", err);
  res.status(500).json({ msg: "Erro interno no servidor" });
 }
});


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