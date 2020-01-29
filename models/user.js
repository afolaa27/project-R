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
	communities: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
		} 
	] // type
})	

const User = mongoose.model('User', userSchema)

module.exports = User