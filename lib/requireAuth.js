module.exports = (req, res, next) => {
  // if someone is not logged in, req.session.loggedIn 
  //will be undefined
  if(!req.session.loggedIn) {
    //message should tell the user that they need to be logged in
    req.session.message = "You must be logged in to do that."

    //redirect to the login page
    res.redirect('/auth/login')
  } else {
    next()
  }
}

