// Variables globales
const mainTitle = document.getElementById("main-title");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const message = document.getElementById("message");
const helpText = document.getElementById("helpText");
const timerMessage = document.getElementById("timerMessage");

// Titulo negro
mainTitle.style.color = "black";

function validatePassword() {
    let password = passwordInput.value.trim();
    let confirmPassword = confirmPasswordInput.value.trim();

    if (password === "" || confirmPassword === "") {
        message.classList.remove("green-text");
        message.classList.add("red-text");
        message.textContent = "Los campos no pueden estar vacíos.";
        passwordInput.classList.add("invalid");
        confirmPasswordInput.classList.add("invalid");
    } else if (password === confirmPassword) {
        message.classList.remove("red-text");
        message.classList.add("green-text");
        message.textContent = "Las contraseñas coinciden.";
        passwordInput.classList.remove("invalid");
        confirmPasswordInput.classList.remove("invalid");
    } else {
        message.classList.remove("green-text");
        message.classList.add("red-text");
        message.textContent = "Las contraseñas no coinciden. Inténtalo de nuevo.";
        passwordInput.classList.add("invalid");
        confirmPasswordInput.classList.add("invalid");
    }
}

function changeStyle() {
    // Cambiar titulo entre negro y morado
    if (mainTitle.style.color === "black") {
        mainTitle.style.color = "purple";
    } else {
        mainTitle.style.color = "black";
    }

    // Cambiar el tamaño titulo
    mainTitle.style.fontSize = (mainTitle.style.fontSize !== "40px") ? "40px" : "36px";
}

function showHelp() {
    helpText.style.visibility = "visible";
    helpText.style.color = "gray";
}

function hideHelp() {
    helpText.style.visibility = "hidden";
}

// Mensaje que se muestra despues de 5 segundos
setTimeout(() => {
    timerMessage.textContent = "Recuerda elegir una contraseña segura.";
}, 5000);
