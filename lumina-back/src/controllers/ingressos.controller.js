const Ingresso = require('../models/Ingresso.model');
const Evento = require('../models/Evento.model');

const listarIngressos = async (req, res) => {
  try {
    const { eventoId } = req.query;

    const filtro = {};

    if (eventoId) {
      filtro.eventoId = eventoId;
    }

    const ingressos = await Ingresso.find(filtro)
      .populate('eventoId', 'dataHora status')

    res.json(ingressos);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const venderIngresso = async (req, res) => {
  try {
    const { eventoId, nomeComprador, emailComprador } = req.body;

    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    if (evento.ingressosVendidos >= evento.capacidade) {
      return res.status(400).json({ error: 'Evento sem ingressos disponíveis' });
    }

    const ingresso = await Ingresso.create({
      eventoId,
      nomeComprador,
      emailComprador,
      valor: evento.valorIngresso,
    });

    await Evento.findByIdAndUpdate(eventoId, {
      $inc: { ingressosVendidos: 1 },
    });

    res.status(201).json(ingresso);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const cancelarIngresso = async (req, res) => {
  try {
    const ingresso = await Ingresso.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelado' },
      { new: true }
    );

    if (!ingresso) {
      return res.status(404).json({ error: 'Ingresso não encontrado' });
    }

    await Evento.findByIdAndUpdate(ingresso.eventoId, {
      $inc: { ingressosVendidos: -1 },
    });

    res.json(ingresso);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = { listarIngressos, venderIngresso, cancelarIngresso };
