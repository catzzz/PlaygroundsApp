
if (process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const { cloudinary } = require("./cloudinary");

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

const { isLoggedIn } = require("./middleware");


// routes
const playgroundsRoutes = require('./routes/playgrounds');
const reviewsRoutes = require('./routes/reviews');
const usersRoutes = require('./routes/users')
const profileRoutes = require('./routes/profile')
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

    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
// flash end

// routes
app.use('/playgrounds', playgroundsRoutes);
app.use('/playgrounds/:id/reviews', reviewsRoutes);
app.use('/profile', profileRoutes);
app.use('/', usersRoutes);

//profile

const multer  = require('multer')
const { storage } = require('./cloudinary');
const upload = multer({ storage });

// app.put('/profile',upload.single('profile-image'),isLoggedIn, async (req, res)=>{
//     const { id } = req.user;
//     const { email, username } = req.body;
//     console.log(id, email, username);
//     const user = await User.findByIdAndUpdate(id, {email, username });
//     const imgs = req.files.map(f =>({url:f.path, filename:f.filename}))
//     res.send(`${req.body} ${req.file}`);
// })

app.put('/profile',upload.single('profile-image'), isLoggedIn, function(req, res, next){
    
    User.findById(req.user.id,  async function  (err, user) {

        // todo: don't forget to handle err

        if (!user) {
            req.flash('error', 'No account found');
            return res.redirect('/playgrounds');
        }

        // good idea to trim 
        const email = req.body.email;
        const username = req.body.username;
        

        // validate 
        if (!email || !username ) { // simplified: '' is a falsey
            req.flash('error', 'One or more fields are empty');
            return res.redirect('/profile'); // modified
        }

        // no need for else since you are returning early ^
        user.email = email;
        user.username = username;
        // get old image 
        if(user.images){
            const oldfilename = user.images.filename;
            await cloudinary.uploader.destroy(oldfilename);
            req.flash('success', 'updated profile');
        }
        
        user.images = ({url:req.file.path, filename:req.file.filename});
     
        // don't forget to save!
        await user.save();
        res.redirect('/playgrounds');
    });
});

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