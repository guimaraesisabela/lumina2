const Atracao = require('../models/Atracao.model');

const listarAtracoes = async (req, res) => {
  try {
    const { tipo, search } = req.query;

    const filtro = {};

    if (tipo && tipo !== 'todos') {
      filtro.tipo = tipo;
    }

    if (search) {
      filtro.nome = { $regex: search, $options: 'i' };
    }

    const atracoes = await Atracao.find(filtro);
    res.json(atracoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const buscarAtracao = async (req, res) => {
  try {
    const atracao = await Atracao.findById(req.params.id);

    if (!atracao) {
      return res.status(404).json({ error: 'Atração não encontrada' });
    }

    res.json(atracao);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const criarAtracao = async (req, res) => {
  try {
    const atracao = await Atracao.create(req.body);
    res.status(201).json(atracao);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const editarAtracao = async (req, res) => {
  try {
    const atracao = await Atracao.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!atracao) {
      return res.status(404).json({ error: 'Atração não encontrada' });
    }

    res.json(atracao);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const removerAtracao = async (req, res) => {
  try {
    const atracao = await Atracao.findByIdAndDelete(req.params.id);

    if (!atracao) {
      return res.status(404).json({ error: 'Atração não encontrada' });
    }

    res.json({ message: 'Atração removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = { listarAtracoes, buscarAtracao, criarAtracao, editarAtracao, removerAtracao };
