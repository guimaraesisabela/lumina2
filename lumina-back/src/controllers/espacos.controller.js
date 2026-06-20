const Espaco = require('../models/Espaco.model');

const listarEspacos = async (req, res) => {
  try {
    const { status, tipo } = req.query;

    const filtro = {};

    if (status && status !== 'todos') {
      filtro.status = status;
    }

    if (tipo && tipo !== 'todos') {
      filtro.tipo = tipo;
    }

    const espacos = await Espaco.find(filtro);
    res.json(espacos);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const buscarEspaco = async (req, res) => {
  try {
    const espaco = await Espaco.findById(req.params.id);

    if (!espaco) {
      return res.status(404).json({ error: 'Espaço não encontrado' });
    }

    res.json(espaco);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const criarEspaco = async (req, res) => {
  try {
    const espaco = await Espaco.create(req.body);
    res.status(201).json(espaco);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const editarEspaco = async (req, res) => {
  try {
    const espaco = await Espaco.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!espaco) {
      return res.status(404).json({ error: 'Espaço não encontrado' });
    }

    res.json(espaco);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const removerEspaco = async (req, res) => {
  try {
    const espaco = await Espaco.findByIdAndDelete(req.params.id);

    if (!espaco) {
      return res.status(404).json({ error: 'Espaço não encontrado' });
    }

    res.json({ message: 'Espaço removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = { listarEspacos, buscarEspaco, criarEspaco, editarEspaco, removerEspaco };
