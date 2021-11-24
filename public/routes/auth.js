const express = require('express')
const passport = require('passport')
const router = express.Router()

// do authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// Callback after authenticated the user
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/log')
    }
)
// Logout
router.get(
    '/logout',
    (req, res) => {
        req.logout()
        res.redirect('/')
    }
)
module.exports = router