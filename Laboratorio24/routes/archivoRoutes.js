const express = require('express');
const router = express.Router();

const archivoController = require('../controller/archivoController.js');
const uploadMiddleware = require('../middlewares/upload');

// Rutas para visualizar archivos
router.get('/', archivoController.getIndex);

// Rutas para subir archivos
router.get('/subir', archivoController.getSubirArchivo);
router.post('/archivo', uploadMiddleware.upload, archivoController.postArchivo);

// Rutas para editar archivos
router.get('/editar/:id', archivoController.getEditarArchivo);
router.post('/editar-archivo', uploadMiddleware.upload, archivoController.postEditarArchivo);

// Rutas para eliminar archivos
router.post('/eliminar', archivoController.postEliminarArchivo);

module.exports = router;