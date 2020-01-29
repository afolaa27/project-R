const express = require('express')
const router = express.Router()
const Community = require('../models/community')
const User = require('../models/user')
const Roar = require('../models/roar')

// public posts
router.get('/feed', async(req, res, next) => {
	
	try{
		//redirect to the feed page once the user is logged in

		const user = await User.findOne({_id : req.session.userId})
		

		if(user.communities.length<1){
			const publicFeeds = await Roar.find({public : true})
			
			if(publicFeeds === null){
				req.session.message = "No roars at the moment "

			}else{
				
				const publicFeeds = await Roar.find({public : true})

				res.render('./roar/show.ejs', {feeds : publicFeeds})
			}				
		}
		else {
			const feeds = await Roar.find({})
			
			res.render('./roar/show.ejs', {feeds : feeds})
		}
	}
	catch(err){
		next(err)
	}
})

// show all posts for a community 




router.get('/new', (req, res)=>{
	res.render('roar/new.ejs')
})
router.post('/new', async(req, res, next) => {

	try{
		const titleToAdd = req.body.title
		const contentToAdd = req.body.content
		const public = req.body.public

		let publicFeed = false

		    //checkbox returns string "on" and we need it to be a boolean
		    //so we convert below
		    if(public === "on"){
		    	ifPublic = true
		    }else{
		    	ifPublic = false
		    }

		    const createRoar = await Roar.create({
		    	title : titleToAdd,
		    	content : contentToAdd,
		    	public : ifPublic,

		    })
		    res.redirect('/feed')
		}
		catch(err){
			next(err)
		}
	})

module.exports = router