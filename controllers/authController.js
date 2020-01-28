const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Roar = require('../models/roar')
//registration 
//GET /register
router.get('/register', async (req, res, next) => {
	try {
  		//console.log("\nwe can register!");
  		//console.log(req.session.message);

  		let messageToDisplay = req.session.message

  		req.session.message = undefined
  		req.session.member = false
  		res.render('register.ejs', {
  			message: messageToDisplay
  		})
	} catch(err) {
		next(err)
	}
})


//next we have to submit the info
//POST /auth/register
router.post('/register', async (req, res, next) => {
    try {

        //console.log(req.body)
        const requestedUsername = req.body.username
        const requestedPassword = req.body.password

        //we have to make sure an account with this user doesn't already
        //exist

        const userHasUsername = await User.findOne({
            username: requestedUsername
        })

        //check to see if user has this username
      

        if (userHasUsername) {

            // use session to tell the user username exists
            //console.log("username exists");

            req.session.message = `${requestedUsername} is already taken.`
            res.redirect('/auth/register')


            // otherwise if the username is available then we can register 
            // the user
        } else {

            const newUser = await User.create({
                username: requestedUsername,
                password: requestedPassword
            })

            //they must be logged in to the session
            req.session.loggedIn = true
            req.session.userId = newUser._id
            //the current username is then the new user
            req.session.username = newUser.username
            req.session.message = "Thanks for signing up " + newUser.username + "!"

            //console.log("now registered as " + newUser.username);

            //we should redirect to home once the user has registered
            res.redirect('/roar/feed')

        }

    } catch (err) {
        next(err)
    }
})


//create the login route 
//GET /login
router.get('/login', async (req, res, next) => {
	try {
  		console.log("\nwe can login!");
  		//console.log(req.session.body)
  		//onsole.log(req.session.message);

  		let messageForLogin = req.session.message

  		req.session.message = undefined
  		res.render('login.ejs', {
  			message: messageForLogin
  		})
	} catch(err) {
		next(err)
	}
})

//be able to login
//POST /login
router.post('/login', async (req, res, next) => {
	try {
		//console.log('\nuser should be able to login')
		//find out if there are any users with that username

		const currentUser = await User.findOne({ 
			username: req.body.username})

		//if there is no user with that username
		if(!currentUser) {
			//console.log('\ninvalid user')

			//create a message to let the user know
			//that it is a bad username or password
			req.session.message = 'Invalid username or password'

			//redirect the user to the login page to try again
			res.redirect('/login')
		} else {
			//if the user does exist 
			// and the user password is the same as the password typed in
			if(currentUser.password == req.body.password) {
				//then the user is logged in 
				req.session.loggedIn = true
				//the user is the same as the userId
				req.session.userId = currentUser._id
				//username is the same 
				req.session.username = currentUser.username
				//change the message so that they user knows
				//that they are logged in
				req.session.message = 'Welcome ' + currentUser.username + "!"

			
				res.redirect('/roar/feed')
			} else {
				//if the password is wrong
				//console.log('password is wrong') 
				//send a message to the user saying it is invalid
				req.session.message = 'Invalid username or password'

				//redirect to the login so they have another chance
				//to login
				res.redirect('auth/login')
			}
		}
	} catch(err) {
		next(err)
	}
})


//logout route 
//destroy session 
router.get('/logout', async (req, res, next) => {
	//destroy the session 
	await req.session.destroy()

	//console.log('\nuser should be able to logout')
	//redirect back to the login page once logged out
	res.redirect('/auth/login')
})









module.exports = router