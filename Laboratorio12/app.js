const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar formularios
app.use(bodyParser.urlencoded({ extended: false }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Importar rutas
const homeRoutes = require('./routes/home');
const mensajesRoutes = require('./routes/mensajes');

app.use(homeRoutes);
app.use('/mensajes', mensajesRoutes);

// Manejo de error 404 con EJS
app.use((req, res) => {
    res.status(404).render('404', { titulo: 'Error 404' });
});

// Iniciar el servidor
const PORT = 4500;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
