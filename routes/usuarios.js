const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.get('/usuarios', usuarioController.index)

module.exports = router