const express = require('express');
const mensajeController = require('../controllers/mensajeController');

const router = express.Router();

router.get('/mensaje', mensajeController.getMensaje);
router.post('/guardar', mensajeController.postMensaje);

module.exports = router;
