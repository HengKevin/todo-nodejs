const router = require('express').Router()
//importing middleware
const {ensureAuth, ensureGuest } = require('../middleware/auth')