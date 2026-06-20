const mongoose = require('mongoose');

const ingressoSchema = new mongoose.Schema(
  {
    eventoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Evento',
      required: true,
    },
    nomeComprador: {
      type: String,
      required: true,
      trim: true,
    },
    emailComprador: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    valor: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['ativo', 'cancelado'],
      default: 'ativo',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ingresso', ingressoSchema);
