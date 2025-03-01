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

router.get('/filtro/:palavra', async (req, res) => {
  const palavra = req.params.palavra.trim();

  function validarPalavra(palavra) {
    return /^[A-Za-zÀ-ÿ\s]+$/.test(palavra);
  }

  if (!palavra || !validarPalavra(palavra)) {
    return res.status(400).json({ msg: "Campo vazio ou palavra inválida." });
  }

  try {
    const livros = await dbKnex('livros')
      .where('titulo', 'like', `%${palavra}%`)
      .orWhere('autor', 'like', `%${palavra}%`);

    if (livros.length === 0) {
      return res.status(404).json({ msg: "Nenhum livro encontrado." });
    }

    res.status(200).json(livros);
  } catch (err) {
    console.error("Erro ao acessar o banco de dados:", err);
    res.status(500).json({ msg: "Erro interno no servidor" });
  }
});

router.get('/dados/resumo', async (req, res) => {
  try {
    const consulta = await dbKnex('livros').count({ num: '*' }).sum({ soma: "preco" }).max({ maior: "preco" }).avg({ media: "preco" });

    if (!consulta || consulta.length === 0) {
      return res.status(404).json({ msg: "Nenhum dado encontrado" });
    };

    const { num, soma, maior, media } = consulta[0];
    res.status(200).json({ num: Number(num) || 0, soma: parseFloat(soma) || 0, maior: parseFloat(maior) || 0, media: parseFloat(media?.toFixed(2)) || 0 });
  } catch (err) {
    console.error("Erro ao acessar o banco de dados:", err);
    res.status(500).json({ msg: "Erro interno no servidor", error: err.stack });
  }
});

router.get('/dados/grafico', async (req, res) => {
  try {
    const totalPorAno = await dbKnex('livros').select('ano').sum({ total: "preco" }).groupBy("ano").orderBy("ano", "asc");

    if (!totalPorAno || totalPorAno.length === 0) {
      return res.status(404).json({ msg: "Nenhum dado encontrado" });
    };

    res.status(200).json(totalPorAno);
  } catch (err) {
    console.error("Erro ao acessar o banco de dados:", err);
    res.status(500).json({ msg: "Erro interno no servidor", error: err.stack });
  }
});

router.get('/dados/registros/:ano', async (req, res) => {
  const { ano } = req.params;

  try {

    const registrosAno = await dbKnex('livros')
      .where('ano', ano)
      .orderBy('titulo', 'asc');

    if (registrosAno.length === 0) {
      return res.status(404).json({ msg: `Nenhum livro encontrado para o ano ${ano}.` });
    }

    res.status(200).json(registrosAno);
  } catch (err) {
    console.error("Erro ao acessar o banco de dados:", err);
    res.status(500).json({ msg: "Erro interno no servidor", error: err.stack });
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
  }

  const camposValidos = {};

  if (dadosAtualizados.titulo) camposValidos.titulo = dadosAtualizados.titulo;
  if (dadosAtualizados.autor) camposValidos.autor = dadosAtualizados.autor;
  if (dadosAtualizados.ano) camposValidos.ano = dadosAtualizados.ano;
  if (dadosAtualizados.preco) camposValidos.preco = dadosAtualizados.preco;
  if (dadosAtualizados.foto) camposValidos.foto = dadosAtualizados.foto;
  if (dadosAtualizados.ativo !== undefined) camposValidos.ativo = dadosAtualizados.ativo;

  if (Object.keys(camposValidos).length === 0) {
    return res.status(400).json({ msg: "Nenhum campo válido para atualizar." });
  }

  try {
    const alteracaoUnica = await dbKnex('livros').where({ id }).update(camposValidos);

    alteracaoUnica
      ? res.status(200).json({ msg: "Livro atualizado com sucesso" })
      : res.status(404).json({ msg: "Livro não encontrado" });
  } catch (err) {
    console.error("Erro ao acessar o banco de dados:", err);
    res.status(500).json({ msg: "Erro interno no servidor" });
  }
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