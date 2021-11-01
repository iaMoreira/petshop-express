const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const petsController = require('./../controllers/petsController')

router.get('/pets',[check('nome'), check('email')], petsController.index)

module.exports = router;
