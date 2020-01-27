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
	admin: {
		ref: 'User'
	}, 
	users: [], 
	bannedUsers: []
})	

const Community = mongoose.model('Community', communitySchema)

module.exports = Community