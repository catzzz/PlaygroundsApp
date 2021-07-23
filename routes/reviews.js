const express = require('express');
const router = express.Router({ mergeParams: true });

const Playground = require('../models/playground');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');


const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}




// Review 

router.post('/', validateReview,catchAsync(async(req, res)=>{
    const playground = await Playground.findById(req.params.id);
    const review = new Review(req.body.review);
   

    playground.reviews.push(review);
    await review.save();
    await playground.save();
    res.redirect(`/playgrounds/${playground._id}`);
}))

// delete review
router.delete('/:reviewId',catchAsync(async(req, res)=>{
    const{id , reviewId} = req.params;
    Playground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(req.params.reviewId);
    res.redirect(`/playgrounds/${id}`);
}))

module.exports = router;