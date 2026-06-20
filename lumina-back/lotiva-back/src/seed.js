require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.model');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado');

    await User.deleteMany({});

    const senha = await bcrypt.hash('123456', 10);

    await User.create([
      {
        firstName: 'Carlos',
        lastName: 'Silva',
        email: 'carlos@lotiva.com',
        password: senha,
        phone: '(11) 98765-4321',
        document: '123.456.789-00',
        role: 'admin',
        status: 'ativo',
      },
      {
        firstName: 'Fernanda',
        lastName: 'Costa',
        email: 'fernanda@lotiva.com',
        password: senha,
        phone: '(21) 99888-7777',
        document: '987.654.321-00',
        role: 'corretor',
        status: 'ativo',
      },
    ]);

    console.log('Usuários criados com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro no seed:', error.message);
    process.exit(1);
  }
};

seed();
