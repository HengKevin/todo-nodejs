module.exports = {
    // if authenticated -> redirect to next pag; else -> login page
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else { 
            res.redirect('/')
        }
    },
    // opposite of ensureAuth
    ensureGuest: function (req, res, next) {
        if (!req.isAuthenticated()){
            return next()
        } else {
            res.redirect('/log')
        }
    },
}