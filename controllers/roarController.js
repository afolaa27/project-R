const express = require('express')
const router = express.Router()
const Community = require('../models/community')
const User = require('../models/user')
const Roar = require('../models/roar')

router.get('/feed', async(req, res, next) => {
	console.log("im here");
	try{
		//redirect to the homepage once the user is logged in
		const user = await User.findOne({_id : req.session.userId})
		console.log("this is my comm",user.communities.length);

		if(user.communities.length<1){
			const publicFeeds = await Roar.find({public : true})
			console.log("this is my feed",publicFeeds);
			if(publicFeeds === null){
				//req.session.message = "No roars at the moment "

			}else{
				console.log("i maed it here boy");
				const publicFeeds = await Roar.find({public : true})

				res.render('./roar/show.ejs', {feeds : publicFeeds})
			}				
		}
		else {
			const feeds = await Roar.find({})
			console.log("this is wrong");
			res.render('./roar/show.ejs', {feeds : feeds})
		}
	}
	catch(err){
		next(err)
	}
})
router.get('/new', (req, res)=>{
	res.render('./roar/new.ejs')
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
		    res.redirect('./feed')
		}
		catch(err){
			next(err)
		}
	})












module.exports = router