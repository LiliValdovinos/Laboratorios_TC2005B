module.exports = class Password {
    static validate(password, confirmPassword) {
        if (password.trim().length < 8) {
            return { valid: false, message: "La contraseña debe tener al menos 8 caracteres." };
        } 
        if (password.trim() !== confirmPassword.trim()) {
            return { valid: false, message: "Las contraseñas no coinciden." };
        }
        return { valid: true, message: "Contraseña válida." };
    }
};
