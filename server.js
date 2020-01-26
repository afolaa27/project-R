require('dotenv').config()
const express = require('express')
const server = express()
const PORT = process.env.PORT
const bodyParser = require('body-parser')
const session = require('express-session')
const methodOverride = require('method-override')








//listeners
server.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
})