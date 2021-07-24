
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const session = require('express-session');
const ExpressError = require('./utils/ExpressError');
const ejsMate = require('ejs-mate');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user')
const flash = require('connect-flash');




// routes
const playgroundsRoutes = require('./routes/playgrounds');
const reviewsRoutes = require('./routes/reviews');
const usersRoutes = require('./routes/users')

// end routes


mongoose.connect('mongodb://localhost:27017/my-playgrounds', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const app = express();

// session config
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
// end session config

// config passport start
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
// save user in session
passport.serializeUser(User.serializeUser());
// get user outof session
passport.deserializeUser(User.deserializeUser());


//config passport end


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



// flash start

app.use(flash());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    console.log(req.user);
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
// flash end

// routes
app.use('/playgrounds', playgroundsRoutes);
app.use('/playgrounds/:id/reviews', reviewsRoutes);
app.use('/', usersRoutes);



// Home
app.get('/', (req, res) => {
    res.render('home')
});

//  error meddileware 
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})


// error handler 
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.statusCode) err.statusCode = 500;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

app.listen(3000,()=>{
    console.log('Serving on port 3000')
})