const http = require('http');  
const fs = require('fs');      

const PORT = 4500; 

// Crear archivos de texto si no existen
if (!fs.existsSync('mensaje.txt')) {
    fs.writeFileSync('mensaje.txt', 'Este es un mensaje generado con Node.js.');
}

// Calcular el promedio de un arreglo de números
const numeros = [10, 20, 30, 40, 50, 60];
const promedio = numeros.reduce((acc, num) => acc + num, 0) / numeros.length;
fs.writeFileSync('promedio.txt', `El promedio de ${numeros.join(', ')} es: ${promedio}`);
console.log(`El promedio del arreglo es: ${promedio}`);

// Definir el HTML dentro del código
const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validador y Mensajes</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
</head>
<body>

    <header class="container center-align">
        <h1 id="main-title">Validador de Contraseña</h1>
    </header>

    <div class="container">
        <div class="row">
            <form id="passwordForm" class="col s12">
                <div class="input-field">
                    <input type="password" id="password" class="validate" required>
                    <label for="password">Contraseña</label>
                </div>
                <div class="input-field">
                    <input type="password" id="confirmPassword" class="validate" required>
                    <label for="confirmPassword">Confirmar Contraseña</label>
                </div>
                <p id="message"></p>
                <button type="button" class="btn waves-effect waves-light" onclick="validatePassword()">Validar</button>
            </form>
        </div>
    </div>

    <div class="container">
        <h3>Enviar Mensaje</h3>
        <form action="/guardar" method="POST">
            <input type="text" name="mensaje" placeholder="Escribe un mensaje" required>
            <button type="submit" class="btn waves-effect waves-light">Enviar</button>
        </form>

        <h3>Ver Mensaje Guardado</h3>
        <a href="/mensaje" class="btn">Ver mensaje</a>
    </div>

    <script>
        function validatePassword() {
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirmPassword").value;
            let message = document.getElementById("message");

            if (password.length < 8) {
                message.innerText = "La contraseña debe tener al menos 8 caracteres.";
                message.style.color = "red";
            } else if (password !== confirmPassword) {
                message.innerText = "Las contraseñas no coinciden.";
                message.style.color = "red";
            } else {
                message.innerText = "Contraseña válida.";
                message.style.color = "green";
            }
        }
    </script>
</body>
</html>
`;

// Crear el servidor 
const server = http.createServer((req, res) => {
    console.log(`Solicitud recibida: ${req.url}`);

    if (req.method === 'GET' && req.url === '/') {
        res.setHeader('Content-Type', 'text/html');  
        res.write(html);  
        res.end();  

    } else if (req.method === 'GET' && req.url === '/mensaje') {
        // Leer mensaje guardado y mostrarlo en una página HTML
        fs.readFile('mensaje.txt', 'utf8', (err, data) => {
            res.setHeader('Content-Type', 'text/html');
            if (err) {
                res.write(`<h2>Error al leer el mensaje</h2>`);
            } else {
                res.write(`<h2>Mensaje Guardado</h2><p>${data}</p>`);
            }
            res.end();
        });

    } else if (req.method === 'POST' && req.url === '/guardar') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const mensaje = decodeURIComponent(body.split('=')[1]) || 'Mensaje vacío';

            // Guardar en el archivo mensaje.txt
            fs.writeFile('mensaje.txt', mensaje, err => {
                res.setHeader('Content-Type', 'text/html');
                if (err) {
                    res.write(`<h2>Error al guardar el mensaje</h2>`);
                } else {
                    res.write(`<h2>Mensaje guardado: ${mensaje}</h2>`);
                }
                res.end();
            });
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(`<h2>Error 404: Página no encontrada</h2>`);
        res.end();
    }
});

// Iniciar el servidor en el puerto 4500
server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
