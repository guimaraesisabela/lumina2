const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const { listarEventos, buscarEvento, criarEvento, editarEvento, atualizarStatusEvento } = require('../controllers/eventos.controller');

router.get('/', authMiddleware, listarEventos);
router.get('/:id', authMiddleware, buscarEvento);
router.post('/', authMiddleware, roleMiddleware('admin', 'organizador'), criarEvento);
router.put('/:id', authMiddleware, roleMiddleware('admin', 'organizador'), editarEvento);
router.patch('/:id/status', authMiddleware, roleMiddleware('admin'), atualizarStatusEvento);

module.exports = router;
