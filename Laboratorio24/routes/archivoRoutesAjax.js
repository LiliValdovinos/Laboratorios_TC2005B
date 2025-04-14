const express = require('express');
const router = express.Router();

const archivoController = require('../controller/archivoControllerAjax.js');
const uploadMiddleware = require('../middlewares/upload');

// Rutas AJAX
router.get('/api/archivos', archivoController.getArchivos);
router.post('/api/archivo', uploadMiddleware.upload, archivoController.postArchivo);
router.put('/api/archivo/:id', uploadMiddleware.upload, archivoController.updateArchivo);
router.delete('/api/archivo/:id', archivoController.deleteArchivo);

module.exports = router;