const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

const listarUsuarios = async (req, res) => {
  try {
    const { role, search } = req.query;

    const filtro = {};

    if (role && role !== 'todos') {
      filtro.role = role;
    }

    if (search) {
      filtro.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const usuarios = await User.find(filtro).select('-password');

    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const buscarUsuario = async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id).select('-password');

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const criarUsuario = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, document, role } = req.body;

    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const hash = await bcrypt.hash(password, 10);

    const usuario = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      phone,
      document,
      role,
    });

    const { password: _, ...usuarioSemSenha } = usuario.toObject();

    res.status(201).json(usuarioSemSenha);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const editarUsuario = async (req, res) => {
  try {
    const { password, ...dados } = req.body;

    if (password) {
      dados.password = await bcrypt.hash(password, 10);
    }

    const usuario = await User.findByIdAndUpdate(
      req.params.id,
      dados,
      { new: true }
    ).select('-password');

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const desativarUsuario = async (req, res) => {
  try {
    const usuario = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'inativo' },
      { new: true }
    ).select('-password');

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = { listarUsuarios, buscarUsuario, criarUsuario, editarUsuario, desativarUsuario };
