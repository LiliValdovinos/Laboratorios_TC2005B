// Variables globales
let map;
let geocoder;
let markers = [];

// Inicializar el mapa cuando el API se carga
function initMap() {
    // Crear un geocoder para las busquedas
    geocoder = new google.maps.Geocoder();
    
    // Configuracion inicial del mapa
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
        mapTypeId: "roadmap"
    });
    
    // Añadir event listeners
    setupEventListeners();
    
    // Cargar marcadores iniciales
    loadInitialMarkers();
}

function setupEventListeners() {
    // Boton de busqueda
    document.getElementById("search-button").addEventListener("click", searchLocation);
    
    // Tecla Enter en el campo de busqueda
    document.getElementById("location-search").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            searchLocation();
        }
    });
    
    // Cambio de tipo de mapa
    document.getElementById("map-type").addEventListener("change", function() {
        map.setMapTypeId(this.value);
    });
    
    // Añadir ubicacion favorita
    document.getElementById("add-favorite").addEventListener("click", addFavoriteLocation);
    
    // Mi ubicación actual
    document.getElementById("find-my-location").addEventListener("click", findMyLocation);
    
    // Hacer clic en ubicaciones favoritas
    document.querySelectorAll(".location-item").forEach(item => {
        item.addEventListener("click", function() {
            const lat = parseFloat(this.getAttribute("data-lat"));
            const lng = parseFloat(this.getAttribute("data-lng"));
            const name = this.textContent;
            
            map.setCenter({ lat, lng });
            map.setZoom(10);
            
            addMarker({ lat, lng }, name);
        });
    });
}

function loadInitialMarkers() {
    // Añadir marcadores para las ubicaciones iniciales
    document.querySelectorAll(".location-item").forEach(item => {
        const lat = parseFloat(item.getAttribute("data-lat"));
        const lng = parseFloat(item.getAttribute("data-lng"));
        const name = item.textContent;
        
        addMarker({ lat, lng }, name, false);
    });
    
    // Ajustar el mapa para mostrar todos los marcadores
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(marker => {
        bounds.extend(marker.getPosition());
    });
    
    map.fitBounds(bounds);
}

function searchLocation() {
    const address = document.getElementById("location-search").value;
    
    if (!address) {
        showAlert("Por favor, introduce una ubicación para buscar.", "warning");
        return;
    }
    
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results[0]) {
            const location = results[0].geometry.location;
            
            map.setCenter(location);
            map.setZoom(12);
            
            addMarker(location, results[0].formatted_address);
        } else {
            showAlert("No se pudo encontrar la ubicación: " + status, "danger");
        }
    });
}

function addFavoriteLocation() {
    const name = document.getElementById("favorite-name").value;
    const address = document.getElementById("favorite-address").value;
    
    if (!name || !address) {
        showAlert("Por favor, completa todos los campos.", "warning");
        return;
    }
    
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results[0]) {
            const location = results[0].geometry.location;
            
            // Crear nuevo elemento en la lista
            const newItem = document.createElement("div");
            newItem.className = "location-item p-2 border-bottom";
            newItem.textContent = name;
            newItem.setAttribute("data-lat", location.lat());
            newItem.setAttribute("data-lng", location.lng());
            newItem.style.cursor = "pointer";
            
            // Añadir event listener
            newItem.addEventListener("click", function() {
                map.setCenter(location);
                map.setZoom(12);
                addMarker(location, name);
            });
            
            // Añadir a la lista
            document.getElementById("favorites-container").appendChild(newItem);
            
            // Limpiar campos
            document.getElementById("favorite-name").value = "";
            document.getElementById("favorite-address").value = "";
            
            // Añadir marcador y centrar mapa
            map.setCenter(location);
            map.setZoom(12);
            addMarker(location, name);
            
            showAlert(`Ubicación "${name}" añadida a favoritos`, "success");
        } else {
            showAlert("No se pudo convertir la dirección en coordenadas: " + status, "danger");
        }
    });
}

function findMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                
                map.setCenter(pos);
                map.setZoom(14);
                
                addMarker(pos, "Mi ubicación");
                showAlert("Ubicación actual encontrada", "success");
            },
            () => {
                showAlert("Error: No se pudo obtener tu ubicación.", "danger");
            }
        );
    } else {
        showAlert("Error: Tu navegador no soporta geolocalización.", "danger");
    }
}

function addMarker(location, title, pan = true) {
    // Crear marcador
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: title,
        animation: google.maps.Animation.DROP
    });
    
    // Añadir info window
    const infowindow = new google.maps.InfoWindow({
        content: `<strong>${title}</strong><br>
                  Lat: ${location.lat.toFixed ? location.lat.toFixed(4) : location.lat()?.toFixed(4)}<br>
                  Lng: ${location.lng.toFixed ? location.lng.toFixed(4) : location.lng()?.toFixed(4)}`
    });
    
    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });
    
    // Almacenar el marcador
    markers.push(marker);
    
    // Centrar el mapa en el marcador
    if (pan) {
        map.panTo(location);
    }
    
    return marker;
}

// Funcion auxiliar para mostrar alertas usando Bootstrap
function showAlert(message, type = "info") {
    // Crear un contenedor para la alerta si no existe
    let alertContainer = document.getElementById("alert-container");
    if (!alertContainer) {
        alertContainer = document.createElement("div");
        alertContainer.id = "alert-container";
        alertContainer.style.position = "fixed";
        alertContainer.style.top = "20px";
        alertContainer.style.right = "20px";
        alertContainer.style.zIndex = "9999";
        document.body.appendChild(alertContainer);
    }
    
    // Crear la alerta
    const alertEl = document.createElement("div");
    alertEl.className = `alert alert-${type} alert-dismissible fade show`;
    alertEl.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Añadir la alerta al contenedor
    alertContainer.appendChild(alertEl);
    
    // Configurar auto-cierre despues de 5 segundos
    setTimeout(() => {
        if (alertEl) {
            const bsAlert = new bootstrap.Alert(alertEl);
            bsAlert.close();
        }
    }, 5000);
}

// Simulación de carga del API de Google Maps
// En una implementación real, esto seria reemplazado por la función initMap que se llama cuando se carga el script de Google Maps
window.onload = function() {
    const mapDiv = document.getElementById("map");
    
    // Añadir estilo de cursor de mano a los elementos de ubicacion
    document.querySelectorAll(".location-item").forEach(item => {
        item.style.cursor = "pointer";
    });
    
    // Mostrar mensaje en el mapa
    mapDiv.innerHTML = `
        <div class="d-flex align-items-center justify-content-center flex-column h-100 p-4 text-center">
            <h3>Simulación de Google Maps API</h3>
            <div class="mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-map text-primary mb-3" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"/>
                </svg>
            </div>
            <p>En una implementación real, aquí se cargaría el mapa interactivo de Google Maps.</p>
            <div class="alert alert-info">
                <h5>Para usar esta aplicación con el API real, se necesitaría:</h5>
                <ul class="text-start">
                    <li>Una clave de API de Google Maps Platform</li>
                    <li>Cargar el script de Google Maps JavaScript API</li>
                    <li>Configurar métodos de pago en Google Cloud Platform</li>
                </ul>
            </div>
            <p class="text-muted">Esta demo muestra la estructura e interfaz, pero no realiza llamadas reales al API.</p>
        </div>
    `;
};