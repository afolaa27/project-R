const mongoose = require('mongoose')

const roarSchema = new mongoose.Schema({
	title: {
		type: String
		required: true
	},
	content: String,
	date: Date.now,
	user: {
		ref: 'User'
	}
	community: {
		ref: "Commmunity"
		// null if public
	}
})	

const Roar = mongoose.model('Roar', roarSchema)

module.exports = Roar