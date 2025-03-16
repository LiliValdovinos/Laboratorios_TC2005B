const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const archivoMensajes = path.join(__dirname, '../mensaje.txt');

// Ruta para mostrar el mensaje guardado en la vista
router.get('/mensaje', (req, res) => {
    fs.readFile(archivoMensajes, 'utf8', (err, data) => {
        if (err) {
            return res.render('mensajes', { mensaje: 'Error al leer el mensaje.' });
        }
        res.render('mensajes', { mensaje: data });
    });
});

// Ruta para guardar el mensaje
router.post('/guardar', (req, res) => {
    const mensaje = req.body.mensaje || 'Mensaje vacío';

    fs.writeFile(archivoMensajes, mensaje, (err) => {
        if (err) {
            return res.render('mensajes', { mensaje: 'Error al guardar el mensaje.' });
        }
        res.render('mensajes', { mensaje: mensaje });
    });
});

module.exports = router;
