// controller/archivoController.js
const fs = require('fs');

// Base de datos simulada (en memoria)
const archivos = [];

exports.getIndex = (req, res) => {
    res.render('index', { 
        archivos: archivos,
        pageTitle: 'Inicio'
    });
};

exports.getSubirArchivo = (req, res) => {
    res.render('subir', { 
        pageTitle: 'Subir Archivo',
        editing: false
    });
};

exports.postArchivo = (req, res) => {
    const titulo = req.body.titulo;
    const archivo = req.file;
    
    if (!archivo) {
        return res.status(422).render('subir', {
            pageTitle: 'Subir Archivo',
            editing: false,
            errorMessage: 'El archivo adjunto no es válido. Solo se permiten imágenes (png, jpg, jpeg).'
        });
    }
    
    const ruta_archivo = archivo.path;
    
    const nuevoArchivo = {
        id: new Date().toISOString(),
        titulo: titulo,
        ruta: ruta_archivo
    };
    
    archivos.push(nuevoArchivo);
    res.redirect('/');
};

exports.getEditarArchivo = (req, res) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    
    const archivoId = req.params.id;
    const archivo = archivos.find(a => a.id === archivoId);
    
    if (!archivo) {
        return res.redirect('/');
    }
    
    res.render('subir', {
        pageTitle: 'Editar Archivo',
        editing: true,
        archivo: archivo
    });
};

exports.postEditarArchivo = (req, res) => {
    const id = req.body.id;
    const tituloActualizado = req.body.titulo;
    const archivoNuevo = req.file;
    
    const archivoIndex = archivos.findIndex(a => a.id === id);
    
    if (archivoIndex >= 0) {
        const archivoActual = archivos[archivoIndex];
        const archivoActualizado = {
            id: archivoActual.id,
            titulo: tituloActualizado,
            ruta: archivoActual.ruta
        };
        
        // Si se subio un nuevo archivo
        if (archivoNuevo) {
            // Eliminar el archivo anterior
            fs.unlink(archivoActual.ruta, (err) => {
                if (err) {
                    console.error('Error al eliminar archivo:', err);
                }
            });
            // Actualizar la ruta con el nuevo archivo
            archivoActualizado.ruta = archivoNuevo.path;
        }
        
        archivos[archivoIndex] = archivoActualizado;
    }
    
    res.redirect('/');
};

exports.postEliminarArchivo = (req, res) => {
    const id = req.body.id;
    
    const archivoIndex = archivos.findIndex(a => a.id === id);
    
    if (archivoIndex >= 0) {
        const archivoEliminar = archivos[archivoIndex];
        
        // Eliminar el archivo fisico
        fs.unlink(archivoEliminar.ruta, (err) => {
            if (err) {
                console.error('Error al eliminar archivo:', err);
            }
        });
        
        // Eliminar de la "base de datos"
        archivos.splice(archivoIndex, 1);
    }
    
    res.redirect('/');
};