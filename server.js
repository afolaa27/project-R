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
server.use(methodOverride('_method'))

//session data
server.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false, 
}))

//add res.locals to store username and userId in session
//to access username in templates
server.use((req, res, next) => {
  if(req.session.loggedIn) {
    res.locals.username = req.session.username
    res.locals.userId = req.session.userId
  } else {
    res.locals.username = false
    res.locals.userId = undefined
    res.locals.loggedIn = false
  }
  next()
})



//controllers
const authController = require('./controllers/authController')
server.use('/auth', authController)

const communityController = require('./controllers/communityController')
server.use('/community', communityController)

const roarController = require('./controllers/roarController')
server.use('/roar',roarController)

const userController = require('./controllers/userController')
server.use('/user',userController)


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