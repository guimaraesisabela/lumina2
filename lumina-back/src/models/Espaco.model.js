const mongoose = require('mongoose');

const espacoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    tipo: {
      type: String,
      enum: ['cinema', 'palco', 'multiuso'],
      required: true,
    },
    capacidade: {
      type: Number,
      required: true,
    },
    descricao: {
      type: String,
      trim: true,
    },
    imagemUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ['ativo', 'inativo', 'em-manutencao'],
      default: 'ativo',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Espaco', espacoSchema);
