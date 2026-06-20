const mongoose = require('mongoose');

const atracaoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    tipo: {
      type: String,
      enum: ['filme', 'show'],
      required: true,
    },
    descricao: {
      type: String,
      trim: true,
    },
    duracao: {
      type: Number,
    },
    genero: {
      type: String,
      trim: true,
    },
    imagemUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Atracao', atracaoSchema);
