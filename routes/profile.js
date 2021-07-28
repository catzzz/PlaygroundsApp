const express = require('express');
const router = express.Router();
const profile = require('../controllers/profile')
const { isLoggedIn } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const multer  = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage });



router.route('/')
    .get(isLoggedIn,profile.index)
    .put(isLoggedIn,upload.single('profile-image'), catchAsync(profile.updateProfile));

module.exports = router;