const express = require('express')
const router = express.Router()
const User = require('../models/user')

//registration 
//GET /register
router.get('/register', async (req, res, next) => {
	try {
  		console.log("\nwe can register!");
  		console.log(req.session.message);

  		let messageToDisplay = req.session.message

  		req.session.message = undefined
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

        console.log(req.body)
        const requestedUsername = req.body.username
        const requestedPassword = req.body.password

        //we have to make sure an account with this user doesn't already
        //exist

        const userHasUsername = await User.findOne({
            username: requestedUsername
        })

        //check to see if user has this username
        console.log(userHasUsername);
        console.log('this is the user')

        if (userHasUsername) {

            // use session to tell the user username exists
            console.log("username exists");

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

            console.log("now registered as " + newUser.username);

            //we should redirect to home once the user has registered
            res.redirect('/')

        }

    } catch (err) {
        next(err)
    }
})















module.exports = router