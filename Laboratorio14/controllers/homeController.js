exports.getHome = (req, res) => {
    let visitas = req.cookies.visitas ? parseInt(req.cookies.visitas) + 1 : 1;

    // Definir la cookie con expiración de 1 día
    res.cookie('visitas', visitas, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

    res.render('home', { visitas });
};
