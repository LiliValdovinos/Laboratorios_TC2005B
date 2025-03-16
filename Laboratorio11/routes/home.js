const express = require('express');
const router = express.Router();

const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validador y Mensajes</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
</head>
<body>
    <header class="container center-align">
        <h1>Validador de Contraseña</h1>
    </header>

    <div class="container">
        <div class="row">
            <form id="passwordForm" class="col s12">
                <div class="input-field">
                    <input type="password" id="password" class="validate" required autocomplete="off">
                    <label for="password" class="active">Contraseña</label>
                </div>
                <div class="input-field">
                    <input type="password" id="confirmPassword" class="validate" required autocomplete="off">
                    <label for="confirmPassword" class="active">Confirmar Contraseña</label>
                </div>
                <p id="message"></p>
                <button type="button" class="btn waves-effect waves-light" onclick="validatePassword()">Validar</button>
            </form>
        </div>
    </div>

    <div class="container">
        <h3>Enviar Mensaje</h3>
        <form action="/mensajes/guardar" method="POST">
            <div class="input-field">
                <input type="text" name="mensaje" id="mensaje" required autocomplete="off">
                <label for="mensaje">Escribe un mensaje</label>
            </div>
            <button type="submit" class="btn waves-effect waves-light">Enviar</button>
        </form>

        <h3>Ver Mensaje Guardado</h3>
        <a href="/mensajes/mensaje" class="btn">Ver mensaje</a>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            M.updateTextFields(); // Evita que los labels se encimen
        });

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

// Ruta principal
router.get('/', (req, res) => {
    res.send(html);
});

module.exports = router;
