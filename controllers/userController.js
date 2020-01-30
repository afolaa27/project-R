const express = require('express')
const router = express.Router()
const Community = require('../models/community')
const User = require('../models/user')
const Roar = require('../models/roar')

//GET /profile 
//we need the userId to be able to see their profile 
//their profile should have all of their communities

router.get('/', async (req, res, next) => {
	try {

		const user = await User.findById(req.session.userId)
		const userCommunity = await Community.find({}).populate('community').populate('user')
		console.log("this is user that wants to UD:",user._id)
		console.log("THIS IS MY COMM : ",userCommunity)
		console.log("I STOP HERE")
		let isAdmin = false
		let isMember = false
		let memberContainer = []

		console.log("Number of users in this community",userCommunity.length);
		console.log("I End Here");


		for(let i = 0; i<userCommunity.length; i++){

			console.log(`the admin: ${userCommunity[i].admin} is a ${typeof userCommunity[i].admin }`);
			console.log(`the user._id: ${user._id} is a ${typeof user._id }`);
			
			console.log("EXPRESSION>>> 1", user._id == userCommunity[i].admin);


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
					memberContainer.push(userCommunity[y])
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
router.delete('/:id', async (req, res, next) => {
	try {
		await User.findByIdAndRemove(req.params.id)

		res.redirect('/user/index.ejs')
	} catch(err) {
		next(err)
	}
})





















module.exports = router