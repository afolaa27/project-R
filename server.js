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


//listeners
server.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
})