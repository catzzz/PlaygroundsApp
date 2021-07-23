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

router.post('/register', async(req, res)=>{
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registerUser = await User.register(user, password);
        req.flash('success', 'Successfully create an account!');
        res.redirect('/playgrounds');
    }catch(e){
        req.flash('error', e.message);
        console.log('error==-==')
        res.redirect('/register');
    }

    

})


module.exports = router;