const mongoose = require('mongoose')

const roarSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: String,
	date: 
	{
		type: Date,
		default :Date.now,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	community: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Commmunity"
		// null if public
	},
	public: Boolean
})	

const Roar = mongoose.model('Roar', roarSchema)

module.exports = Roar