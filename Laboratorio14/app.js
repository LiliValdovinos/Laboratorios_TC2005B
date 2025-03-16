const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware para archivos estáticos y procesar formularios
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Configurar sesiones
app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo', 
    resave: false,
    saveUninitialized: false
}));

// Configurar flash messages
app.use(flash());

// Middleware para pasar variables de sesión a las vistas
app.use((req, res, next) => {
    res.locals.mensajeFlash = req.flash('mensaje');
    next();
});

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
