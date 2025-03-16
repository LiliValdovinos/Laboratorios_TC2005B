const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const archivoMensajes = path.join(__dirname, '../mensaje.txt');

// Asegurar que el archivo existe
if (!fs.existsSync(archivoMensajes)) {
    fs.writeFileSync(archivoMensajes, 'Este es un mensaje generado con Node.js.');
}

// Ruta para mostrar el mensaje guardado
router.get('/mensaje', (req, res) => {
    fs.readFile(archivoMensajes, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('<h2>Error al leer el mensaje</h2>');
        } else {
            res.send(`<h2>Mensaje Guardado</h2><p>${data}</p>`);
        }
    });
});

// Ruta para guardar el mensaje
router.post('/guardar', (req, res) => {
    const mensaje = req.body.mensaje || 'Mensaje vacío';

    fs.writeFile(archivoMensajes, mensaje, (err) => {
        if (err) {
            res.status(500).send('<h2>Error al guardar el mensaje</h2>');
        } else {
            res.send(`<h2>Mensaje guardado: ${mensaje}</h2>`);
        }
    });
});

module.exports = router;
