// Variables globales
let map;
let geocoder;
let markers = [];

// Inicializar el mapa cuando el API se carga
function initMap() {
    console.log("initMap ha sido llamada");
    
    try {
        // Crear un geocoder para las busquedas
        geocoder = new google.maps.Geocoder();
        
        // Configuracion inicial del mapa
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 0, lng: 0 },
            zoom: 2,
            mapTypeId: "roadmap"
        });
        
        console.log("Mapa inicializado correctamente");
        
        // Añadir event listeners
        setupEventListeners();
        
        // Cargar marcadores iniciales
        loadInitialMarkers();
    } catch (error) {
        console.error("Error al inicializar el mapa:", error);
        alert("Error al inicializar el mapa: " + error.message);
    }
}

function setupEventListeners() {
    try {
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
        
        console.log("Event listeners configurados correctamente");
    } catch (error) {
        console.error("Error al configurar event listeners:", error);
    }
}

function loadInitialMarkers() {
    try {
        // Añadir marcadores para las ubicaciones iniciales
        document.querySelectorAll(".location-item").forEach(item => {
            const lat = parseFloat(item.getAttribute("data-lat"));
            const lng = parseFloat(item.getAttribute("data-lng"));
            const name = item.textContent;
            
            addMarker({ lat, lng }, name, false);
        });
        
        // Ajustar el mapa para mostrar todos los marcadores
        if (markers.length > 0) {
            const bounds = new google.maps.LatLngBounds();
            markers.forEach(marker => {
                bounds.extend(marker.getPosition());
            });
            
            map.fitBounds(bounds);
        }
        
        console.log("Marcadores iniciales cargados:", markers.length);
    } catch (error) {
        console.error("Error al cargar marcadores iniciales:", error);
    }
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
    try {
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
    } catch (error) {
        console.error("Error al añadir marcador:", error);
        showAlert("Error al añadir marcador: " + error.message, "danger");
        return null;
    }
}

// Funcion auxiliar para mostrar alertas usando Bootstrap
function showAlert(message, type = "info") {
    try {
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
                try {
                    const bsAlert = new bootstrap.Alert(alertEl);
                    bsAlert.close();
                } catch (e) {
                    // Fallback si bootstrap no está disponible
                    alertEl.remove();
                }
            }
        }, 5000);
    } catch (error) {
        console.error("Error al mostrar alerta:", error);
        // Fallback para mostrar una alerta nativa
        alert(message);
    }
}
