const express = require('express');
const homeController = require('../controllers/homeController');
const router = express.Router();
const { check, body } = require('express-validator');

router.get('/', homeController.index)
router.get('/contatos', homeController.getContatos)

router.post('/contatos',
    [
        body('nome').isLength({ min: 1 }),
        body('mensagem'),
        body('email'),
    ],
    homeController.postContato
)

router.get('/cadastro', homeController.getCadastro)

router.post('/cadastro', [
        check('nome').isLength({ min: 3 }),
        check('senha'),
        check('email'),
    ],
    homeController.postCadastro
)

router.get('/login', homeController.getLogin)

router.post('/login', homeController.postLogin)
router.get('/servico', homeController.servico)
router.get('/sobre', homeController.sobre)

module.exports = router