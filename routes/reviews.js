const express = require("express");
const router = express.Router({ mergeParams: true });

const reviews = require("../controllers/reviews");

const { isLoggedIn, validateReview, isAuthor } = require("../middleware");

const catchAsync = require("../utils/catchAsync");

// Review

router.post("/", validateReview, catchAsync(reviews.postAReview));

// delete review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  catchAsync(reviews.deleteAReview)
);

module.exports = router;
