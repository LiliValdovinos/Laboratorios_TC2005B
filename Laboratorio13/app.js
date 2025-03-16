const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware para archivos estáticos y procesar formularios
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Importar rutas
const homeRoutes = require('./routes/home');
const mensajeRoutes = require('./routes/mensajes');
const passwordRoutes = require('./routes/password');

app.use(homeRoutes);
app.use('/mensajes', mensajeRoutes);
app.use('/password', passwordRoutes);

// Manejo de error 404
app.use((req, res) => {
    res.status(404).render('404');
});

// Iniciar el servidor
const PORT = 4500;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
