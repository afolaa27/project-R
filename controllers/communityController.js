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
router.post('/new',requireAuth, async (req, res, next)=>{
	try{

		//gets all community information from the new.ejs form
		console.log("User id :",req.session.username);
		const title = req.body.communityTitle
		const zipCode = req.body.zipCode
		const description = req.body.communityDescription
		const creator = req.session.userId

		//creates a community with its information in the community collections
		//datatbase
		const createCommunity = await Community.create({
			name : title,
			description : description,
			zip: zipCode,
			
			admin: creator
		})	
		res.redirect('/community/show')
	}
	catch(err){
		next(err)
	}

})

//displays all communities
router.get('/show',  async(req, res, next) => {

	try{
		//gets all created communities
		const allCommunities = await Community.find({}).populate('admin').populate('community.admin')
		console.log("who made this page ",allCommunities);

		//passes all communities to the template
		res.render('community/show.ejs', {communities : allCommunities})
	}
	catch(err){
		next(err)
	}	
})





module.exports = router