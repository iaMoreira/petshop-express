const express = require('express');
const servicoController = require('../controllers/servicoController');
const router = express.Router();
const loginMiddleware = require('../middlewares/loginMiddleware')

const storage = require('../config/storage')
const uploadAvatar = storage('avatar', '/servicos')

router.use(loginMiddleware)
router.get('/', servicoController.index)
router.post('/', uploadAvatar,  servicoController.save)


router.get('/cadastro', servicoController.store)
router.get('/:id/edit', servicoController.edit)
router.put('/:id', uploadAvatar, servicoController.update)
router.delete('/:id', servicoController.delete)


module.exports = router