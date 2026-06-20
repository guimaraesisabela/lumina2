const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema(
  {
    espacoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Espaco',
      required: true,
    },
    atracaoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Atracao',
      required: true,
    },
    dataHora: {
      type: Date,
      required: true,
    },
    valorIngresso: {
      type: Number,
      required: true,
    },
    capacidade: {
      type: Number,
      required: true,
    },
    ingressosVendidos: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['agendado', 'em-andamento', 'encerrado', 'cancelado'],
      default: 'agendado',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Evento', eventoSchema);
