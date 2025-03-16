const mensajes = [];

module.exports = class Mensaje {
    constructor(texto) {
        this.texto = texto;
    }

    save() {
        mensajes.push(this);
    }

    static fetchAll() {
        return mensajes;
    }
};
