const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const {
  listarLoteamentos,
  buscarLoteamento,
  criarLoteamento,
  editarLoteamento,
  removerLoteamento,
} = require('../controllers/loteamentos.controller');

router.get('/', authMiddleware, listarLoteamentos);
router.get('/:id', authMiddleware, buscarLoteamento);
router.post('/', authMiddleware, roleMiddleware('admin'), criarLoteamento);
router.put('/:id', authMiddleware, roleMiddleware('admin'), editarLoteamento);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), removerLoteamento);

module.exports = router;
