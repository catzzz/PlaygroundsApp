const express = require("express");
const router = express.Router();
const playgrounds = require("../controllers/playgrounds");
const catchAsync = require("../utils/catchAsync");
const { playgroundSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const Playground = require("../models/playground");

const { isLoggedIn, validatePlayground, isAuthor } = require("../middleware");


const multer  = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage });

  // List all playgrounds
router.route('/')
  .get(catchAsync(playgrounds.index))
  // Add new Playground api
  .post(
    isLoggedIn,
   
    upload.array('image'),
    validatePlayground,
    catchAsync(playgrounds.createPlayground)
  );



// New
router.get("/new", isLoggedIn, playgrounds.renderNewPlaygroundPage);

router.route("/:id")
   // Show single Playground
  .get(catchAsync(playgrounds.showPlayground))
  // Edit single Playground
  .put(
    isLoggedIn,
    isAuthor,
    upload.array('image'),
    validatePlayground,
    catchAsync(playgrounds.updatePlayground)
  )
  // Delete single playground
  .delete(
    isLoggedIn,
    isAuthor,
    catchAsync(playgrounds.deletePlayground)
  );

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(playgrounds.renderEditPlaygroundPage)
);

module.exports = router;
