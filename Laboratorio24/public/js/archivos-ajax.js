// Variables globales
let archivoActual = null;
let modoEdicion = false;
let modal = null;

// Inicialización cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar modal de Bootstrap
    modal = new bootstrap.Modal(document.getElementById('archivoModal'));
    
    // Cargar archivos al iniciar
    cargarArchivos();
    
    // Manejar evento de botón para nueva subida
    document.getElementById('btn-nueva-subida').addEventListener('click', () => {
        abrirModalCreacion();
    });
    
    // Manejar evento de botón de guardar en el modal
    document.getElementById('btn-guardar').addEventListener('click', guardarArchivo);
    
    // Manejar cambio en el input de archivo para actualizar preview
    document.getElementById('archivo-input').addEventListener('change', mostrarVistaPrevia);
});

// Función para cargar todos los archivos desde el servidor
const cargarArchivos = () => {
    fetch('/api/archivos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar archivos');
            }
            return response.json();
        })
        .then(data => {
            mostrarArchivos(data.archivos);
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarMensaje('error', 'Error al cargar los archivos');
        });
};

// Función para mostrar los archivos en el contenedor
const mostrarArchivos = (archivos) => {
    const contenedor = document.getElementById('archivos-container');
    
    // Si no hay archivos, mostrar mensaje
    if (!archivos || archivos.length === 0) {
        const template = document.getElementById('empty-template');
        const clone = document.importNode(template.content, true);
        
        // Agregar evento al botón de subida en estado vacío
        clone.querySelector('#btn-empty-upload').addEventListener('click', () => {
            abrirModalCreacion();
        });
        
        contenedor.innerHTML = '';
        contenedor.appendChild(clone);
        return;
    }
    
    // Construir grid de archivos
    let html = '<div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">';
    
    archivos.forEach(archivo => {
        html += `
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <img src="/${archivo.ruta}" class="card-img-top" alt="${archivo.titulo}" 
                         style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${archivo.titulo}</h5>
                        <p class="card-text text-muted small">${archivo.ruta}</p>
                    </div>
                    <div class="card-footer bg-light d-flex justify-content-between">
                        <button class="btn btn-outline-primary btn-sm btn-editar" data-id="${archivo.id}">
                            <i class="bi bi-pencil me-1"></i>Editar
                        </button>
                        <button class="btn btn-outline-danger btn-sm btn-eliminar" data-id="${archivo.id}">
                            <i class="bi bi-trash me-1"></i>Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    contenedor.innerHTML = html;
    
    // Agregar eventos a los botones de editar y eliminar
    agregarEventosEditar();
    agregarEventosEliminar();
};

// Función para agregar eventos a los botones de editar
const agregarEventosEditar = () => {
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            cargarArchivoParaEditar(id);
        });
    });
};

// Función para agregar eventos a los botones de eliminar
const agregarEventosEliminar = () => {
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            confirmarEliminarArchivo(id);
        });
    });
};

// Función para abrir el modal en modo creación
const abrirModalCreacion = () => {
    // Resetear el formulario
    document.getElementById('archivo-form').reset();
    document.getElementById('archivo-id').value = '';
    document.getElementById('preview-container').classList.add('d-none');
    
    // Configurar el modal para creación
    document.getElementById('archivoModalLabel').textContent = 'Subir Nuevo Archivo';
    document.getElementById('btn-guardar').textContent = 'Subir Archivo';
    document.getElementById('archivo-input').required = true;
    
    // Limpiar mensajes
    document.getElementById('form-mensajes').innerHTML = '';
    
    // Establecer modo
    modoEdicion = false;
    archivoActual = null;
    
    // Mostrar el modal
    modal.show();
};

// Función para cargar un archivo para editar
const cargarArchivoParaEditar = (id) => {
    fetch(`/api/archivo/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo');
            }
            return response.json();
        })
        .then(data => {
            archivoActual = data.archivo;
            
            // Llenar el formulario con los datos
            document.getElementById('archivo-id').value = archivoActual.id;
            document.getElementById('titulo').value = archivoActual.titulo;
            
            // Mostrar preview del archivo actual
            document.getElementById('archivo-preview').src = `/${archivoActual.ruta}`;
            document.getElementById('archivo-preview').alt = archivoActual.titulo;
            document.getElementById('preview-container').classList.remove('d-none');
            
            // Configurar el modal para edición
            document.getElementById('archivoModalLabel').textContent = 'Editar Archivo';
            document.getElementById('btn-guardar').textContent = 'Actualizar Archivo';
            document.getElementById('archivo-input').required = false;
            
            // Establecer modo
            modoEdicion = true;
            
            // Mostrar el modal
            modal.show();
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarMensaje('error', 'Error al cargar el archivo para editar');
        });
};

// Función para guardar un archivo (crear o actualizar)
const guardarArchivo = () => {
    // Validar el formulario
    const titulo = document.getElementById('titulo').value.trim();
    const archivoInput = document.getElementById('archivo-input');
    
    if (!titulo) {
        mostrarMensajeFormulario('error', 'Por favor ingrese un título');
        return;
    }
    
    if (!modoEdicion && !archivoInput.files[0]) {
        mostrarMensajeFormulario('error', 'Por favor seleccione un archivo');
        return;
    }
    
    // Crear FormData
    const formData = new FormData();
    formData.append('titulo', titulo);
    
    if (archivoInput.files[0]) {
        formData.append('archivo', archivoInput.files[0]);
    }
    
    // URL y método según modo
    let url = '/api/archivo';
    let method = 'POST';
    
    if (modoEdicion) {
        url = `/api/archivo/${archivoActual.id}`;
        method = 'PUT';
    }
    
    // Enviar solicitud
    fetch(url, {
        method: method,
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al guardar el archivo');
        }
        return response.json();
    })
    .then(data => {
        // Cerrar modal
        modal.hide();
        
        // Mostrar mensaje de éxito
        mostrarMensaje('success', data.message);
        
        // Recargar archivos
        cargarArchivos();
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensajeFormulario('error', 'Error al guardar el archivo');
    });
};

// Función para confirmar eliminación de archivo
const confirmarEliminarArchivo = (id) => {
    if (confirm('¿Está seguro que desea eliminar este archivo?')) {
        eliminarArchivo(id);
    }
};

// Función para eliminar un archivo
const eliminarArchivo = (id) => {
    fetch(`/api/archivo/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar el archivo');
        }
        return response.json();
    })
    .then(data => {
        mostrarMensaje('success', data.message);
        cargarArchivos();
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensaje('error', 'Error al eliminar el archivo');
    });
};

// Función para mostrar vista previa de imagen seleccionada
const mostrarVistaPrevia = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const previewContainer = document.getElementById('preview-container');
    const previewImg = document.getElementById('archivo-preview');
    
    // Crear URL para la vista previa
    const url = URL.createObjectURL(file);
    previewImg.src = url;
    previewImg.alt = file.name;
    
    // Mostrar contenedor de vista previa
    previewContainer.classList.remove('d-none');
};

// Función para mostrar mensajes de error/éxito en el formulario
const mostrarMensajeFormulario = (tipo, mensaje) => {
    const contenedor = document.getElementById('form-mensajes');
    const alertClass = tipo === 'success' ? 'alert-success' : 'alert-danger';
    
    contenedor.innerHTML = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
};

// Función para mostrar mensajes de error/éxito generales
const mostrarMensaje = (tipo, mensaje) => {
    const contenedor = document.getElementById('mensajes-container');
    const alertClass = tipo === 'success' ? 'alert-success' : 'alert-danger';
    
    contenedor.innerHTML = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    // Auto-cerrar después de 3 segundos
    setTimeout(() => {
        const alerta = contenedor.querySelector('.alert');
        if (alerta) {
            const bsAlert = new bootstrap.Alert(alerta);
            bsAlert.close();
        }
    }, 3000);
};