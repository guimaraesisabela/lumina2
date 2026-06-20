const mongoose = require('mongoose');

const documentoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const loteamentoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    cidade: {
      type: String,
      required: true,
      trim: true,
    },
    estado: {
      type: String,
      required: true,
      trim: true,
    },
    quadras: {
      type: Number,
      required: true,
    },
    totalLotes: {
      type: Number,
      required: true,
    },
    areaTotal: {
      type: Number,
      required: true,
    },
    endereco: {
      type: String,
      trim: true,
    },
    cep: {
      type: String,
      trim: true,
    },
    imagemUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ['ativo', 'em-lancamento', 'concluido'],
      default: 'em-lancamento',
    },
    documentos: [documentoSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Loteamento', loteamentoSchema);
