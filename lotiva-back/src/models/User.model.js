const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    document: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'corretor'],
      required: true,
    },
    status: {
      type: String,
      enum: ['ativo', 'inativo'],
      default: 'ativo',
    },
    avatarUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
