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
		console.log(user)
		console.log(userCommunity)


		res.render('user/index.ejs', {
			user: user,
			communities: userCommunity
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