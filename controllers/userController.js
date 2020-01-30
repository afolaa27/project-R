const express = require('express')
const router = express.Router()
const Community = require('../models/community')
const User = require('../models/user')
const Roar = require('../models/roar')

//GET /profile 
//we need the userId to be able to see their profile 
//their profile should have all of their communities

router.get('/:userId', async (req, res, next) => {
	try {

		const user = await User.findById(req.session.userId).populate('communities')
		const userCommunity = await Community.find({}).populate('user')
	
		let isAdmin = false
		let isMember = false
		let memberContainer = []


		for(let i = 0; i<userCommunity.length; i++){

			if(user._id.toString() == userCommunity[i].admin.toString()){
				console.log("inside the loop: ", userCommunity[i].admin);
				isAdmin = true
			}else{
				isAdmin = false
			}
		}
		let users = ""
		let usersId = ""
		for(let y = 0; y<userCommunity.length; y++){
			users = userCommunity[y].users
			for (let x = 0; x < users.length; x++){
				usersId = users[x]
				if (user._id.toString() == usersId.toString()){
					isMember = true
					memberContainer.push(userCommunity[y]._id)
				}
			}
		}
		let bothAdminAndMember = false
		if (isAdmin == true && isMember == true){
			bothAdminAndMember = true
		}
		console.log("i am a member of: ",memberContainer);
		console.log(isAdmin);
		console.log(isMember);
		console.log(bothAdminAndMember);

		res.render('user/index.ejs', {
			user: user,
			communities: memberContainer,
			isAdmin: isAdmin,
			isMember : isMember,
			both: bothAdminAndMember
		})
	} catch(err) {
		next(err)
	}
})





//destroy route
//leave the community 
router.delete('/:communityId', async (req, res, next) => {
//  /user/5e313dad6067360c1ea85741

	try {
		// find user by id (req.session.userId)
		// remove community from the user.communities array
		// save
		const userInCommunity = await User.findById(req.session.userId)
		console.log('this is the user in community ' + userInCommunity)

		// user.community.id(req.params.communityId).remove()
		// await user.save()
		res.redirect('/user/communityId')
	} catch(err) {
		next(err)
	}
})





















module.exports = router