const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

// show register page
router.get('/register',(req, res)=> {
    res.render('users/register');
})
// show login page
router.get('/login',(req, res)=> {
    res.render('users/login');
})


module.exports = router;