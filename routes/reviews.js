const express = require('express');
const router = express.Router({ mergeParams: true });

const Playground = require('../models/playground');
const Review = require('../models/review');


const {isLoggedIn, validateReview,isAuthor}  = require('../middleware');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');





// Review 

router.post('/', validateReview,catchAsync(async(req, res)=>{
    const playground = await Playground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;

    playground.reviews.push(review);
    await review.save();
    await playground.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/playgrounds/${playground._id}`);
}))

// delete review
router.delete('/:reviewId',isLoggedIn,isAuthor,catchAsync(async(req, res)=>{
    const{id , reviewId} = req.params;
    Playground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/playgrounds/${id}`);
}))

module.exports = router;