require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./src/routes/auth.routes');
const usersRoutes = require('./src/routes/users.routes');
const espacosRoutes = require('./src/routes/espacos.routes');
const atracoesRoutes = require('./src/routes/atracoes.routes');
const eventosRoutes = require('./src/routes/eventos.routes');
const ingressosRoutes = require('./src/routes/ingressos.routes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/usuarios', usersRoutes);
app.use('/espacos', espacosRoutes);
app.use('/atracoes', atracoesRoutes);
app.use('/eventos', eventosRoutes);
app.use('/ingressos', ingressosRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Lumina API rodando!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
