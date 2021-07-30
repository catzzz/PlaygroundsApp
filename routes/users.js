const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const users = require("../controllers/users");
const { emailValidateion, passwordValidateion } = require("../middleware");

router
  .route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));

// show login page

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );

// logout user
router.get("/logout", users.logout);
module.exports = router;

// forget password page
router
  .route("/forgotPassword")
  .get(users.renderForgotPassword)
  .post(emailValidateion, users.sendResetEmail);

// send email to reset password

router
  .route("/resetPassword/:userId/:token")
  .get(users.renderResetPassword)
  .post(passwordValidateion, users.resetPassword);
