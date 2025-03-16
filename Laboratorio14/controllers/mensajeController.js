const Mensaje = require('../models/mensaje');

exports.getMensaje = (req, res) => {
    res.render('mensaje', { mensaje: Mensaje.fetchAll() });
};

exports.postMensaje = (req, res) => {
    const nuevoMensaje = new Mensaje(req.body.mensaje);
    nuevoMensaje.save();
    res.redirect('/mensajes/mensaje');
};
