const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const {
  listarUsuarios,
  buscarUsuario,
  criarUsuario,
  editarUsuario,
  desativarUsuario,
} = require('../controllers/users.controller');

router.get('/', authMiddleware, listarUsuarios);
router.get('/:id', authMiddleware, buscarUsuario);
router.post('/', authMiddleware, roleMiddleware('admin'), criarUsuario);
router.put('/:id', authMiddleware, roleMiddleware('admin'), editarUsuario);
router.patch('/:id/desativar', authMiddleware, roleMiddleware('admin'), desativarUsuario);

module.exports = router;
