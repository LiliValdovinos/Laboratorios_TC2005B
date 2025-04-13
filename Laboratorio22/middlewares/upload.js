// middlewares/upload.js
const multer = require('multer');

// Configurar el almacenamiento para multer
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        // 'uploads': Directorio donde se guardarán los archivos
        callback(null, 'uploads');
    },
    filename: (request, file, callback) => {
        // Configuramos el nombre del archivo en el servidor
        // Reemplazamos ":" por "-" para evitar problemas en sistemas de archivos
        callback(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    },
});

// Configurar filtro para tipos de archivos
const fileFilter = (request, file, callback) => {
    if (
        file.mimetype == 'image/png' || 
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'
    ) {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

// Middleware de Multer configurado
exports.upload = multer({ 
    storage: fileStorage, 
    fileFilter: fileFilter 
}).single('archivo');