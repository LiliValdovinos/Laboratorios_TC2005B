const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Servir archivos estaticos
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
  res.render('index');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});