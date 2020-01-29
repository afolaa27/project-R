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
		const messageToDisplay = req.session.message
		const allCommunities = await Community.find({}).populate('admin').populate('community.admin')
		//console.log("who made this page ",allCommunities);
		/*const communitiesJoined = await User.findById({_id : req.session.userId})

		console.log('populates',communitiesJoined.communities);*/
		
		//passes all communities to the template
		res.render('community/show.ejs', { 
			communities: allCommunities, 
			message: messageToDisplay,
			loggedInUserId: req.session.userId
		})
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
			const userToJoin = await User.findById(req.session.userId)

			console.log(userToJoin)
			const communityToJoin = await Community.findById(req.params.id)


		    //queried the database to see if user is already a part of a community
		    const communityMember = await Community.findById(userToJoin._id)

		    //queried the database to see if commiunity has been added to the list of 
		    //communities the user is a member of
		    const userMember = await User.findById(communityToJoin._id)


		    console.log("new member ", communityMember +" community to join ", userMember);

		    if (!communityMember && !userMember ){

		    	communityToJoin.users.push(userToJoin._id)
		    	userToJoin.communities.push(communityToJoin._id)
		    	communityToJoin.save()
		    	userToJoin.save()
		    	res.redirect('/roar/feed')
		    	console.log("I joined");
		    	
		    }else{
		    	console.log("I am a member");
		    	req.session.message = "You Are Already a member of this Community"

		    	res.redirect('/community/show')
		    	req.session.message = " "

		    }



		    console.log(communityToJoin);
		}
		catch(err){
			next(err)
		}
	})




module.exports = router