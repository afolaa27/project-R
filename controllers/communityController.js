const express = require('express')
const router = express.Router()
const Community = require('../models/community')
const User = require('../models/user')
const Roar = require('../models/roar')

//require login
const requireAuth = require('../lib/requireAuth')


router.get('/new', (req, res)=>{
	res.render('community/new.ejs')
})

//creates new community
router.post('/new', async (req, res, next)=>{
	try{

		//gets all community information from the new.ejs form
		const title = req.body.communityTitle
		const zipCode = req.body.zipCode
		const description = req.body.communityDescription

		//creates a community with its information in the community collections
		//datatbase
		const createCommunity = await Community.create({
			name : title,
			description : description,
			zip: zipCode,
			
			admin: req.session.userId
		})	
		res.redirect()
	}
	catch(err){
		next(err)
	}

})

//displays all communities
router.get('/show',  async(req, res, next) => {

	try{
		//gets all created communities
		const allCommunities = await Community.find({}).populate('admin')
		console.log(allCommunities.admin);

		//passes all communities to the template
		res.render('community/show.ejs', {communities : allCommunities})
	}
	catch(err){
		next(err)
	}	
})





module.exports = router