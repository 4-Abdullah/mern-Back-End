const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logooutControlller');

router.get('/', logoutController.handleLogout);

module.exports = router