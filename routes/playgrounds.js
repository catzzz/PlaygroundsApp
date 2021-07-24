const express = require('express');
const router = express.Router();
const playgrounds = require('../controllers/playgrounds');
const catchAsync = require('../utils/catchAsync');
const { playgroundSchema } = require('../schemas.js');
const ExpressError = require('../utils/ExpressError');
const Playground = require('../models/playground');
const { isLoggedIn,validatePlayground, isAuthor } = require('../middleware');





// List all playgrounds
router.get('/', catchAsync(playgrounds.index));

// New 

router.get('/new',isLoggedIn, playgrounds.renderNewPlaygroundPage );

// Add new Playground api
router.post('/',isLoggedIn, validatePlayground, catchAsync(playgrounds.createPlayground))

// Show single Playground

router.get('/:id', catchAsync(playgrounds.showPlayground));

// Show edit single Playground
router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync(playgrounds.renderEditPlaygroundPage))
// Edit single Playground
router.put('/:id',isLoggedIn, isAuthor, validatePlayground, catchAsync(playgrounds.updatePlayground))

router.delete('/:id', isLoggedIn, isAuthor,catchAsync( playgrounds.deletePlayground))
module.exports = router;