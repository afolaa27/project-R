const express = require('express')
const router = express.Router()
const User = require('../models/user')

//registration 
//GET /register
router.get('/register', (req, res) => {
  console.log("\n able to register");
  console.log(req.session.message);

  let messageToDisplay = req.session.message
  let messageStatus = req.session.messageStatus

  req.session.message = undefined

  res.render('register.ejs', {
    message: messageToDisplay,
  })
})


//next we have to submit the info
//POST /auth/register
router.post('/register', async (req, res, next) => {
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

  if(userHasUsername) { // this works bc null is falsey
                             // if you use .find(), consider if(queryResult.length > 0)
    
    // use session to tell the user username exists
    console.log("username exists");

    req.session.message = `${requestedUsername} is already taken.`
    res.redirect('/auth/register')


    //otherwise if the username is available then we can register 
    //the user
  } else {

    const newUser = await User.create({
      username: requestedUsername,
      password: requestedPassword
    })

    //they must be logged in to the session
    req.session.loggedIn = true
    // helpful to store something that uniquely identifies them
    // recommend: their id -- it is "more" unique that a username we had to validate
    req.session.userId = createdUser._id
    req.session.username = createdUser.username
    req.session.message = "Thanks for signing up, " + createdUser.username + "."
    req.session.messageStatus = "good"

    console.log("successful registration as " + createdUser.username);
 
    // redirect -- to home -- later
    res.redirect('/')

  }
})
















module.exports = router