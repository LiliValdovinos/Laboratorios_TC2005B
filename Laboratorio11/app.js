const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware para procesar formularios
app.use(bodyParser.urlencoded({ extended: false }));

// Importar rutas desde la carpeta routes
const homeRoutes = require('./routes/home');
const mensajesRoutes = require('./routes/mensajes');

app.use(homeRoutes);
app.use('/mensajes', mensajesRoutes);

// Manejo de error 404
app.use((req, res) => {
    res.status(404).send('<h2>Error 404: Página no encontrada</h2>');
});

// Iniciar el servidor
const PORT = 4500;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
