const fs = require('fs');
const fileUtils = require('../utils/filesystem');

// Importar el controlador principal para acceder a la lista de archivos
const archivoController = require('./archivoController');

// GET: Obtener todos los archivos
exports.getArchivos = (req, res) => {
    // Asegurar que usamos la misma referencia al array de archivos
    res.status(200).json({
        message: "Archivos recuperados con éxito",
        archivos: archivoController.archivos
    });
};

// GET: Obtener un archivo especifico
exports.getArchivo = (req, res) => {
    const id = req.params.id;
    const archivo = archivoController.archivos.find(a => a.id === id);
    
    if (!archivo) {
        return res.status(404).json({
            message: "Archivo no encontrado"
        });
    }
    
    res.status(200).json({
        message: "Archivo recuperado con éxito",
        archivo: archivo
    });
};

// POST: Crear un nuevo archivo
exports.postArchivo = (req, res) => {
    const titulo = req.body.titulo;
    const archivo = req.file;
    
    if (!archivo) {
        return res.status(422).json({
            message: "El archivo adjunto no es válido. Solo se permiten imágenes (png, jpg, jpeg)."
        });
    }
    
    const ruta_archivo = archivo.path;
    
    const nuevoArchivo = {
        id: new Date().toISOString(),
        titulo: titulo,
        ruta: ruta_archivo
    };
    
    archivoController.archivos.push(nuevoArchivo);
    res.status(201).json({
        message: "Archivo creado exitosamente",
        archivo: nuevoArchivo
    });
};

// PUT: Actualizar un archivo existente
exports.updateArchivo = (req, res) => {
    const id = req.params.id;
    const tituloActualizado = req.body.titulo;
    const archivoNuevo = req.file;
    
    const archivoIndex = archivoController.archivos.findIndex(a => a.id === id);
    
    if (archivoIndex < 0) {
        return res.status(404).json({
            message: "Archivo no encontrado"
        });
    }
    
    const archivoActual = archivoController.archivos[archivoIndex];
    const archivoActualizado = {
        id: archivoActual.id,
        titulo: tituloActualizado || archivoActual.titulo,
        ruta: archivoActual.ruta
    };
    
    // Si se subio un nuevo archivo
    if (archivoNuevo) {
        // Eliminar el archivo anterior
        fileUtils.deleteFile(archivoActual.ruta)
            .catch(err => console.error('Error al eliminar archivo:', err));
            
        // Actualizar la ruta con el nuevo archivo
        archivoActualizado.ruta = archivoNuevo.path;
    }
    
    archivoController.archivos[archivoIndex] = archivoActualizado;
    
    res.status(200).json({
        message: "Archivo actualizado exitosamente",
        archivo: archivoActualizado
    });
};

// DELETE: Eliminar un archivo
exports.deleteArchivo = (req, res) => {
    const id = req.params.id;
    
    const archivoIndex = archivoController.archivos.findIndex(a => a.id === id);
    
    if (archivoIndex < 0) {
        return res.status(404).json({
            message: "Archivo no encontrado"
        });
    }
    
    const archivoEliminar = archivoController.archivos[archivoIndex];
    
    // Eliminar el archivo fisico
    fileUtils.deleteFile(archivoEliminar.ruta)
        .catch(err => console.error('Error al eliminar archivo:', err));
    
    // Eliminar de la "base de datos"
    archivoController.archivos.splice(archivoIndex, 1);
    
    res.status(200).json({
        message: "Archivo eliminado exitosamente"
    });
};