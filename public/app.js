const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
require('./config/passport')(passport)

// Connect to mongodb and set express template
var app=express()
const PORT = process.env.PORT||3000
dotenv.config({ path: './config/config.env' })

mongoose.connect(process.env.MONGO_URI, {
    userNewUrlParser: true,
    useUnifiedTopology: true
})
app.use(express.static('public'))
app.set('view engine', 'ejs')

// Initialize middleware and setup database for storing sessions
app.use(express.urlencoded({extended:true}))
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Import routes
app.use(require("./routes/index"))
app.use('/auth', require('./routes/auth'))

app.listen(PORT, console.log(`listening at ${PORT}`))


// function to add 2 numbers
