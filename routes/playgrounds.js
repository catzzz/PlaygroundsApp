const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { playgroundSchema } = require('../schemas.js');
const ExpressError = require('../utils/ExpressError');
const Playground = require('../models/playground');

const validatePlayground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


// List all playgrounds
router.get('/', catchAsync(async (req, res) => {
    const playgrounds = await Playground.find({});
    res.render('playground/index', { playgrounds })
}));

// New 

router.get('/new', (req, res) => {
    res.render('playgrounds/new');
})

// Add new Playground api
router.post('/', validatePlayground, catchAsync(async (req, res, next) => {
    
 
    if(!req.body.playground) throw new ExpressError('Invalid Playground Data',400);
    const playground = new Playground(req.body.playground);
    await playground.save();
    res.redirect(`/playgrounds/${playground._id}`);

}))

// Show single Playground

router.get('/:id', catchAsync(async (req, res, next) => {
    const playground = await Playground.findById(req.params.id).populate('reviews');
    console.log(playground);
    res.render('playgrounds/show', { playground });
}));

// Show edit single Playground
router.get('/:id/edit', catchAsync(async (req, res) => {
    const playground = await Playground.findById(req.params.id)
    
    res.render('playgrounds/edit', { playground });
}))
// Edit single Playground
router.put('/:id', validatePlayground,catchAsync(async (req, res) => {
    const { id } = req.params;
    const playground = await Playground.findByIdAndUpdate(id, { ...req.body.playground });
    
    res.redirect(`/playgrounds/${playground._id}`)
}))

router.delete('/:id', catchAsync( async (req, res) => {
    const { id } = req.params;
    await Playground.findByIdAndDelete(id);
    res.redirect('/playgrounds');
}))
module.exports = router;