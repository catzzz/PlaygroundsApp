const User = require("../models/user");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto');

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Yelp Camp!");
      res.redirect("/playgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "welcome back!");
  const redirectUrl = req.session.returnTo || "/playgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "Logged Out, And Goodbye!");
  res.redirect("/playgrounds");
};

// Profile

module.exports.renderProfile = (req, res) => {
  res.render("users/profile");
};

// forget password

module.exports.renderForgotPassword = (req, res) => {
  res.render("users/forgotPassword");
};

// send reset email



module.exports.sendResetEmail = async (req, res, next) => {
  try {
    const email = req.body.resetEmail;

    // find user
    const user = await User.findOne({ email: email });
    if (!user) {
      req.flash("error", "email didn't exist");
      return res.redirect("users/forgotPassword");
    }
    // find token
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    // const link = `${process.env.BASE_URL}/resetPassword/${user._id}/${token.token}`;
    const link = `localhost:3000/resetPassword/${user._id}/${token.token}`;
    
    // await sendEmail(user.email, "Password reset", link);
    req.flash("success","password reset link sent to your email account");
    console.log(link);
    res.redirect('login')
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("forgotPassword");
  }
};


// render resetpassword page
module.exports.renderResetPassword = (req, res) =>{
    res.render('users/resetPassword');
}

// post resetpassword page

module.exports.resetPassword = async (req, res) => {
    try {
        const redirectUrl = req.session.returnTo || "/login";
        const user = await User.findById(req.params.userId);
        if (!user) {
            req.flash("error", "invalid link or expired");
            return res.redirect(redirectUrl);
        }

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) {
            req.flash("error", "invalid link or expired");
            return res.redirect(redirectUrl);
        }
        // upate password without old password
        await user.setPassword(req.body.password);
        await user.save();
        await token.delete();
        req.flash("success", "password reset sucessfully.");
        res.redirect('/login');
    } catch (error) {
        req.flash("error", error.message);
        console.log(error);
        res.redirect('/login');
    }
}