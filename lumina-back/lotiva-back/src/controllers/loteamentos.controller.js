const Loteamento = require('../models/Loteamento.model');

const listarLoteamentos = async (req, res) => {
  try {
    const { status, search } = req.query;

    const filtro = {};

    if (status && status !== 'todos') {
      filtro.status = status;
    }

    if (search) {
      filtro.$or = [
        { nome: { $regex: search, $options: 'i' } },
        { cidade: { $regex: search, $options: 'i' } },
      ];
    }

    const loteamentos = await Loteamento.find(filtro);

    res.json(loteamentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const buscarLoteamento = async (req, res) => {
  try {
    const loteamento = await Loteamento.findById(req.params.id);

    if (!loteamento) {
      return res.status(404).json({ error: 'Loteamento não encontrado' });
    }

    res.json(loteamento);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const criarLoteamento = async (req, res) => {
  try {
    const loteamento = await Loteamento.create(req.body);
    res.status(201).json(loteamento);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const editarLoteamento = async (req, res) => {
  try {
    const loteamento = await Loteamento.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!loteamento) {
      return res.status(404).json({ error: 'Loteamento não encontrado' });
    }

    res.json(loteamento);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const removerLoteamento = async (req, res) => {
  try {
    const loteamento = await Loteamento.findByIdAndDelete(req.params.id);

    if (!loteamento) {
      return res.status(404).json({ error: 'Loteamento não encontrado' });
    }

    res.json({ message: 'Loteamento removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  listarLoteamentos,
  buscarLoteamento,
  criarLoteamento,
  editarLoteamento,
  removerLoteamento,
};
