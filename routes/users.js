const express = require('express');
const router = express.Router();

const User = require('../models/user');

// Register
router.get('/register', (req,res)=>{
  res.render('register');
});

//Register User
router.post('/register', (req,res)=>{
  const regUser = {
    "name": req.body.name,
    "email": req.body.email,
    "username": req.body.username,
    "password": req.body.password,
    "password2": req.body.password2
  };

  // Validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Confirm Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if(errors){
    //console.log(errors)
    res.render('register', {
      errors:errors
    });
  }else{
    const newUser = new User({
      name: regUser.name,
      email: regUser.email,
      username: regUser.username,
      password: regUser.password
    });

    User.createUser(newUser, (err, user)=>{
      if(err) throw err;
      console.log(user);
    });
    req.flash('success_msg', "You are registered and can now login");
    res.redirect('/users/login')
  }


});

// Login

router.get('/login', (req,res)=>{
  res.render('login');
});

module.exports = router;