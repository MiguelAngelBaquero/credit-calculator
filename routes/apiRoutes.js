const express = require('express');
const router = express.Router();
const ProxyController = require('../controllers/proxyController');
const { authenticateJWT, authorizeRoles } = require('../middlewares/authMiddleware');

router.post('/proxy', authenticateJWT, authorizeRoles('admin', 'analyst'), ProxyController.proxyRequest);

module.exports = router;