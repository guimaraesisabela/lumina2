const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const { listarEspacos, buscarEspaco, criarEspaco, editarEspaco, removerEspaco } = require('../controllers/espacos.controller');

router.get('/', authMiddleware, listarEspacos);
router.get('/:id', authMiddleware, buscarEspaco);
router.post('/', authMiddleware, roleMiddleware('admin'), criarEspaco);
router.put('/:id', authMiddleware, roleMiddleware('admin'), editarEspaco);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), removerEspaco);

module.exports = router;
