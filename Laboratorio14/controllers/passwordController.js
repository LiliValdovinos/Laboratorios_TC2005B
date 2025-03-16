exports.getPassword = (req, res) => {
    res.render('password', { username: req.session.username || '' });
};

exports.postLogin = (req, res) => {
    req.session.username = req.body.username;
    res.redirect('/password');
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/password');
    });
};
