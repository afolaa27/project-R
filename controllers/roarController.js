const express = require('express')
const router = express.Router()
const Community = require('../models/community')
const User = require('../models/user')
const Roar = require('../models/roar')



//public feed

router.get('/feed', async(req, res, next) => {
	try{
		//redirect to the feed page once the user is logged in

		const user = await User.findById(req.session.userId)
		console.log( "this is the user :" ,user);
		console.log(user.communities.length)

		if(user.communities.length<1){
			const publicFeeds = await Roar.find({public : true})
			
			if(publicFeeds === null){
				req.session.message = "No roars at the moment "

			}else{
				
				const publicFeeds = await Roar.find({public : true})
				console.log("heres the member :",req.session.member);
				res.render('./roar/show.ejs', {feeds : publicFeeds, member : req.session.member})
			}				
		}
		else {
			const feeds = await Roar.find({public : true})
			const userCommunity = await User.findById(req.session.userId).populate("communities")
			//console.log("community i guess : ", userCommunity.communities.length);

				let communityId = '' 
				let posts = []

			for(let i = 0; i < userCommunity.communities.length; i++){
				communityId = userCommunity.communities[i]._id

				const communityPosts = await Community.findById(communityId).populate('roars')
				posts = communityPosts.roars
			
				console.log( "posts :",posts) 
				console.log("My membership status ;", req.session.member);
			}
			//console.log('these are my communities:', );
			res.render('./roar/show.ejs', {feeds : feeds, member : req.session.member, communityPost : posts})
		}
	}
	catch(err){
		next(err)
	}
})

//creating roar feed for each specific community id
router.get('/feed/:id', async (req, res, next) => {
	try {
		console.log("this is the community im adding roars to :",req.params.id);
		const communitiesForUser = await Community.findById(req.params.id).populate('roars')
		req.session.member = true
		console.log("this is the information for this community: ",communitiesForUser.roars);
		const feed = communitiesForUser.roars
		console.log("My membership status ;", req.session.member);

		res.render('roar/show.ejs', {communityPost : feed, community : req.params.id , member: req.session.member })

	} catch(err) {
		next(err)
	}
})


// add new roar 

router.get('/new', (req, res)=>{

	res.render('roar/new.ejs')

})

//posting public roars
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
		    res.redirect('/roar/feed')
		}
		catch(err){
			next(err)
		}
	})

router.get('/new/:id',  async(req, res, next) => {
	try{
		const id = req.params.id
		console.log("the id of the community ",id);
		req.session.member = true
	   	res.render('roar/new.ejs', {id : id, member : req.session.member})
	  }
	    catch(err){
	      next(err)
	  }
		
})
router.post('/new/:id', async(req, res, next) => {
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
		    console.log("community to add roar: ", req.params.id);
		    console.log("User adding roar: ", req.session.userId);
		    const createRoar = await Roar.create({
		    	title : titleToAdd,
		    	content : contentToAdd,
		    	community : req.params.id,
		    	user : req.params.userId,
		    	public : ifPublic,

		    })

		    const communityId = await Community.findById(req.params.id)
		    
		    	const community = communityId.roars;
		    	community.push(createRoar)
		    	communityId.save()
		    res.redirect('/roar/feed/'+ req.params.id)
		  }
		    catch(err){
		      next(err)
		  }
})





module.exports = router