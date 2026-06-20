const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const { listarIngressos, venderIngresso, cancelarIngresso } = require('../controllers/ingressos.controller');

router.get('/', authMiddleware, listarIngressos);
router.post('/', authMiddleware, roleMiddleware('admin', 'organizador'), venderIngresso);
router.patch('/:id/cancelar', authMiddleware, roleMiddleware('admin'), cancelarIngresso);

module.exports = router;
