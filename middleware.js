
const { playgroundSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Playground = require('./models/playground');
const Review = require('./models/review');
const validateEmail = require('./utils/validateEmail')
const isRequired = (value) => (value === "" ? false : true);

module.exports.validatePlayground = (req, res, next) => {

    const { error } = playgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
       
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}


module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const playground = await Playground.findById(id);
    if (!playground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/playground/${id}`);
    }
    next();
}

// Review Middleware

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// Validate email 

module.exports.emailValidateion = (req, res, next) =>{
    const email = req.body.resetEmail
    if(!isRequired(email)){
        req.flash('error', 'Email cannot be blank');
        return res.redirect(`/forgotPassword`);
    }
    if(!validateEmail(email)) {
        req.flash('error', 'You need to type valid email address!');
        return res.redirect(`/forgotPassword`);
    }
    next();

}

// validate password 
module.exports.passwordValidateion = (req, res, next) =>{
    const password = req.body.password
    if(!isRequired(password)){
        req.flash('error', 'password cannot be blank');
        return res.redirect(`/resetPassword`);
    }
    next();

}