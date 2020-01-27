require('dotenv').config()
const express = require('express')
const server = express()
const PORT = process.env.PORT
const bodyParser = require('body-parser')
const session = require('express-session')
const methodOverride = require('method-override')

//connect to db
require('./db/db.js')

//middleware
server.use(express.static('public'))
server.use(bodyParser.urlencoded({ extended: false }))

//session data
server.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false, 
}))


//controllers
const authController = require('./controllers/authController')
server.use('/auth', authController)


//render the main page
server.get('/', (req, res) => {
	//once logged in, the user should see a message
	const messageForUser = req.session.message
  	req.session.message = ''
	res.render('home.ejs', {
		message: messageForUser
	})
})

//create 404 error page
server.get('*', (req, res) => {
	res.render('404.ejs')
})

//listeners
server.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
})