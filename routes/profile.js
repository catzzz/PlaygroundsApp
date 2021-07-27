const express = require('express');
const router = express.Router();
const profile = require('../controllers/profile')
const { isLoggedIn, isAuthor } = require("../middleware");

// router.put('/profile',isLoggedIn,(req,res)=>{
//         res.send('update profile');
// })
router.route('/')
    .get(isLoggedIn,profile.index);

module.exports = router;