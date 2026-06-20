require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./src/routes/auth.routes');
const usersRoutes = require('./src/routes/users.routes');
const loteamentosRoutes = require('./src/routes/loteamentos.routes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/usuarios', usersRoutes);
app.use('/loteamentos', loteamentosRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Lotiva API rodando!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
