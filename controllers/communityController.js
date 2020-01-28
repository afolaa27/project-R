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
		//console.log("User id :",req.session.username);
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
router.get('/show', requireAuth,  async(req, res, next) => {

	try{
		//gets all created communities
		const allCommunities = await Community.find({}).populate('admin').populate('community.admin')
		//console.log("who made this page ",allCommunities);

		//passes all communities to the template
		res.render('community/show.ejs', {communities : allCommunities})
	}
	catch(err){
		next(err)
	}	
})


//join a specific community 

router.post('/join/:id', requireAuth, async(req, res, next) => {
		try{
			
			//queried the database for the user that wants to join a community 
			//and the community they wants to join 
			const userToJoin = await User.findOne({_id: req.session.userId})
		    const communityToJoin = await Community.findOne({_id : req.params.id})
		    

		    //queried the database to see if user is already a part of a community
		    const communityMember = await Community.findOne({users : userToJoin._id})

		    //queried the database to see if commiunity has been added to the list of 
		    //communities the user is a member of
		    const userMember = await User.findOne({communities : communityToJoin._id})
		  

		  	console.log("new member ", communityMember +" community to join ", userMember);

		    if (!communityMember && !userMember ){
		    	communityToJoin.users.push({_id: userToJoin._id})
		    	userToJoin.communities.push({_id: communityToJoin._id})
		   		communityToJoin.save()
		   		userToJoin.save()
		   		console.log("I joined");
		    }else{
		    	console.log("I am a member");
		    	req.session.message = "You Are Already a member of this Community"
		    	res.redirect('/community/show')
		    }



		    console.log(communityToJoin);
		  }
		    catch(err){
		      next(err)
		  }
})




module.exports = router