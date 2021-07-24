const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { playgroundSchema } = require('../schemas.js');
const ExpressError = require('../utils/ExpressError');
const Playground = require('../models/playground');
const { isLoggedIn,validatePlayground, isAuthor } = require('../middleware');





// List all playgrounds
router.get('/', catchAsync(async (req, res) => {
    const playgrounds = await Playground.find({});
    res.render('playgrounds/index', { playgrounds })
}));

// New 

router.get('/new',isLoggedIn, (req, res) => {
    res.render('playgrounds/new');
})

// Add new Playground api
router.post('/',isLoggedIn, validatePlayground, catchAsync(async (req, res, next) => {
    
 
    if(!req.body.playground) throw new ExpressError('Invalid Playground Data',400);
    const playground = new Playground(req.body.playground);
    playground.author = req.user._id;
    await playground.save();
    req.flash('success', 'Successfully made a new playground!');
    res.redirect(`/playgrounds/${playground._id}`);

}))

// Show single Playground

router.get('/:id', catchAsync(async (req, res, next) => {
    const playground = await Playground.findById(req.params.id).populate('reviews').populate('author');
    console.log(playground);
    if (!playground) {
        req.flash('error', 'Cannot find that playground!');
        return res.redirect('/playgrounds');
    }
    res.render('playgrounds/show', { playground });
}));

// Show edit single Playground
router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const playground = await Playground.findById(req.params.id)
    if (!playground) {
        req.flash('error', 'Cannot find that playground!');
        return res.redirect('/playgrounds');
    }
    res.render('playgrounds/edit', { playground });
}))
// Edit single Playground
router.put('/:id',isLoggedIn, isAuthor, validatePlayground,catchAsync(async (req, res) => {
    const { id } = req.params;
    const playground = await Playground.findByIdAndUpdate(id, { ...req.body.playground });
    req.flash('success', 'Successfully updated playground!');
    res.redirect(`/playgrounds/${playground._id}`)
}))

router.delete('/:id', isLoggedIn, isAuthor,catchAsync( async (req, res) => {
    const { id } = req.params;
    await Playground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted playground!');
    res.redirect('/playgrounds');
}))
module.exports = router;