const express = require('express');
const servicoController = require('../controllers/servicoController');
const router = express.Router();
const loginMiddleware = require('../middlewares/loginMiddleware')

router.use(loginMiddleware)
router.get('/', servicoController.index)
router.post('/', servicoController.save)


router.get('/cadastro', servicoController.store)
router.get('/:id/edit', servicoController.edit)
router
    .route('/:id')
    .put(servicoController.update)
    .delete(servicoController.delete)


module.exports = router