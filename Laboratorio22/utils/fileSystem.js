const fs = require('fs');
const path = require('path');

// Funcion para asegurar que existe un directorio
exports.ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Directorio creado: ${dirPath}`);
    }
};

// Funcion para crear un archivo index.html vacio en un directorio
exports.createEmptyIndexFile = (dirPath) => {
    const indexPath = path.join(dirPath, 'index.html');
    fs.writeFileSync(indexPath, '<!DOCTYPE html><html><body></body></html>');
    console.log(`Archivo index.html creado en: ${dirPath}`);
};

// Funcion para eliminar un archivo de forma segura
exports.deleteFile = (filePath) => {
    return new Promise((resolve, reject) => {
        if (!filePath) {
            return resolve(false);
        }
        
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error al eliminar archivo:', err);
                reject(err);
            } else {
                console.log(`Archivo eliminado: ${filePath}`);
                resolve(true);
            }
        });
    });
};

// Funcion para verificar si un archivo existe
exports.fileExists = (filePath) => {
    return fs.existsSync(filePath);
};

// Funcion para inicializar directorios necesarios para la aplicacion
exports.initializeDirectories = () => {
    // Directorios requeridos por la aplicación
    const requiredDirs = [
        'uploads',
        'public',
        'public/css',
        'public/js',
        'public/images'
    ];
    
    // Crear directorios y archivos index.html
    requiredDirs.forEach(dir => {
        this.ensureDirectoryExists(dir);
        this.createEmptyIndexFile(dir);
    });
    
    console.log('Sistema de archivos inicializado correctamente');
};