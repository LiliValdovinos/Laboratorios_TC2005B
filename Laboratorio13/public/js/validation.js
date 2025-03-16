function validatePassword() {
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();
    let message = document.getElementById("message");

    console.log("Password ingresada:", `"${password}"`, "Longitud:", password.length);
    console.log("Confirmación ingresada:", `"${confirmPassword}"`, "Longitud:", confirmPassword.length);

    // Limpiar mensaje antes de validar
    message.innerText = "";

    if (password.length < 8) {
        console.log("Error: La contraseña es demasiado corta.");
        message.innerText = "La contraseña debe tener al menos 8 caracteres.";
        message.style.color = "red";
    } else if (password !== confirmPassword) {
        console.log("Error: Las contraseñas NO coinciden.");
        message.innerText = "Las contraseñas no coinciden.";
        message.style.color = "red";
    } else {
        console.log("Éxito: Las contraseñas son IGUALES.");
        message.innerText = "Contraseña válida.";
        message.style.color = "green";
    }
}
