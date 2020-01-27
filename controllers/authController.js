const express = require('express')
const router = express.Router()
const User = require('../models/user')

//registration 
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
















module.exports = router