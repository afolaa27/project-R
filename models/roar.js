const mongoose = require('mongoose')

const roarSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: String,
	date: {
		type: Date,
	 	default: Date.now
	 }
	user: {
		ref: 'User'
	},
	community: {
		ref: "Commmunity"
		// null if public
	},
	public: Boolean
})	

const Roar = mongoose.model('Roar', roarSchema)

module.exports = Roar