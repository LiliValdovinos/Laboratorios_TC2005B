const http = require('http');  // Modulo para crear el servidor HTTP
const fs = require('fs');      // Modulo para manejar archivos

const PORT = 4500; // Puerto donde se ejecuta el servidor

// Crear archivos de texto
fs.writeFileSync('hola.txt', 'Hola desde Node.js');
fs.writeFileSync('mensaje.txt', 'Este es un mensaje generado con Node.js.');

// Calcular el promedio de un arreglo de numeros
const numeros = [10, 20, 30, 40, 50, 60];
const promedio = numeros.reduce((acc, num) => acc + num, 0) / numeros.length;
fs.writeFileSync('promedio.txt', `El promedio de ${numeros.join(', ')} es: ${promedio}`);
console.log(`El promedio del arreglo es: ${promedio}`);

// Definir el HTML dentro del codigo
const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validador de Contraseña</title>
    <!-- Importar Materialize -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
</head>
<body>

    <header class="container center-align">
        <h1 id="main-title" onclick="changeStyle()">Validador de Contraseña</h1>
    </header>

    <div class="container">
        <div class="row">
            <form id="passwordForm" class="col s12">
                <div class="input-field">
                    <input type="password" id="password" class="validate" onfocus="showHelp()" onblur="hideHelp()" required>
                    <label for="password">Contraseña</label>
                    <span id="helpText" class="helper-text" style="visibility:hidden;">Usa una contraseña segura con al menos 8 caracteres.</span>
                </div>
                <div class="input-field">
                    <input type="password" id="confirmPassword" class="validate" required>
                    <label for="confirmPassword">Confirmar Contraseña</label>
                </div>
                <p id="message"></p>
                <button type="button" class="btn waves-effect waves-light" onclick="validatePassword()">Validar</button>
            </form>
        </div>
        <p id="timerMessage" class="blue-text"></p>
    </div>

    <!-- Preguntas -->
    <div class="container">
        <h3>Preguntas a responder</h3>
        <ul class="collection">
            <li class="collection-item">
                <strong>¿Por qué es una buena práctica usar JavaScript para checar que sean válidos los inputs de las formas antes de enviar los datos al servidor?</strong>
                <p>Es una buena práctica porque evita envíos innecesarios al servidor, mejora la experiencia del usuario al mostrar errores de inmediato y reduce el tráfico en la red.</p>
            </li>
            <li class="collection-item">
                <strong>¿Cómo puedes saltarte la seguridad de validaciones hechas con JavaScript?</strong>
                <p>Se puede desactivar JavaScript en el navegador, modificar el código en la consola (F12) o enviar datos manipulados con herramientas como Postman.</p>
            </li>
            <li class="collection-item">
                <strong>Si te puedes saltar la seguridad de las validaciones de JavaScript, entonces ¿por qué la primera pregunta dice que es una buena práctica?</strong>
                <p>Porque la validación en el cliente mejora la usabilidad y previene errores básicos, pero la seguridad real debe manejarse en el servidor.</p>
            </li>
        </ul>
    </div>

    <!-- Importar Materialize JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script>
        function showHelp() {
            document.getElementById('helpText').style.visibility = "visible";
        }

        function hideHelp() {
            document.getElementById('helpText').style.visibility = "hidden";
        }

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

    res.setHeader('Content-Type', 'text/html');  // Indica que la respuesta es HTML
    res.write(html);  // Envia la pag HTML al navegador
    res.end();  // Finaliza la respuesta
});

// Iniciar el servidor en el puerto 4500
server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
