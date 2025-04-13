const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Importar rutas
const archivoRoutes = require('./routes/archivoRoutes');

const app = express();

// Configurar vistas
app.set('view engine', 'ejs');
app.set('views', 'views');

// Configurar middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Registrar rutas
app.use(archivoRoutes);

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

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
    console.log(`Servidor disponible en: http://localhost:${PORT}`);
});