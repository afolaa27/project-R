const mongoose = require('mongoose')

const communitySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	zip: {
		type: Number,
		required: true,
	},
	description:{
		type: String,
		required: true,
	},
	date:{
		type: Date,
		default: Date.now
	},
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User', 
		required : true
	}, 
	users: [], 
	bannedUsers: []
})	

const Community = mongoose.model('Community', communitySchema)

module.exports = Community