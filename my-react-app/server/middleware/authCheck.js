

const userAuthCheck = (req, res, next) => {
    if (req.session && req.session.user) {
        return res.redirect('/home');
    }

    return res.render('userLogin');
}

const adminAuthCheck = (req, res) => {
    if (req.session && req.session.admin) {
        return res.redirect('/admin')
    }

    return res.render('adminLogin')
}

module.exports = {
    userAuthCheck,
    adminAuthCheck
}