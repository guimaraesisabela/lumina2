const Evento = require('../models/Evento.model');

const listarEventos = async (req, res) => {
  try {
    const { status, espacoId } = req.query;

    const filtro = {};

    if (status && status !== 'todos') {
      filtro.status = status;
    }

    if (espacoId) {
      filtro.espacoId = espacoId;
    }

    const eventos = await Evento.find(filtro)
      .populate('espacoId', 'nome tipo')
      .populate('atracaoId', 'nome tipo imagemUrl');

    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const buscarEvento = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id)
      .populate('espacoId', 'nome tipo capacidade')
      .populate('atracaoId', 'nome tipo descricao duracao genero imagemUrl');

    if (!evento) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    res.json(evento);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const criarEvento = async (req, res) => {
  try {
    const evento = await Evento.create(req.body);
    res.status(201).json(evento);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const editarEvento = async (req, res) => {
  try {
    const evento = await Evento.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!evento) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    res.json(evento);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const atualizarStatusEvento = async (req, res) => {
  try {
    const { status } = req.body;

    const evento = await Evento.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!evento) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    res.json(evento);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = { listarEventos, buscarEvento, criarEvento, editarEvento, atualizarStatusEvento };
