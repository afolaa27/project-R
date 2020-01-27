const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
	},
	firstName: String,
	lastName: String,
	communities: []
})	

const User = mongoose.model('User', userSchema)

module.exports = User