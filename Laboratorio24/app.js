const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Importar rutas
const archivoRoutes = require('./routes/archivoRoutes');
const archivoRoutesAjax = require('./routes/archivoRoutesAjax'); // Nuevas rutas AJAX

const app = express();

// Configurar vistas
app.set('view engine', 'ejs');
app.set('views', 'views');

// Configurar middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Para manejar peticiones JSON
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public'))); // Para servir archivos estáticos

// Registrar rutas
app.use(archivoRoutes);
app.use(archivoRoutesAjax); // Registrar rutas AJAX

// Manejar error 404
app.use((req, res) => {
    res.status(404).render('404', { 
        pageTitle: 'Página no encontrada',
    });
});

// Asegurarse de que existe el directorio uploads
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Crear un index.html vacio en el directorio uploads para evitar listado
fs.writeFileSync('uploads/index.html', '');

// Asegurarse de que existe el directorio public/js
if (!fs.existsSync('public/js')) {
    fs.mkdirSync('public/js', { recursive: true });
}

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
    console.log(`Servidor disponible en: http://localhost:${PORT}`);
});