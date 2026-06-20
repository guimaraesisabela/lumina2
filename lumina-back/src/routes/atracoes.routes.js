const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const { listarAtracoes, buscarAtracao, criarAtracao, editarAtracao, removerAtracao } = require('../controllers/atracoes.controller');

router.get('/', authMiddleware, listarAtracoes);
router.get('/:id', authMiddleware, buscarAtracao);
router.post('/', authMiddleware, roleMiddleware('admin'), criarAtracao);
router.put('/:id', authMiddleware, roleMiddleware('admin'), editarAtracao);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), removerAtracao);

module.exports = router;
