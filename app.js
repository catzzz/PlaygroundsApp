
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Playground = require('./models/playground');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const ejsMate = require('ejs-mate');
const Joi = require('joi');
const{playgroundSchema,reviewSchema} = require('./schema');
const Review = require('./models/review')

mongoose.connect('mongodb://localhost:27017/my-playgrounds', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

const validatePlayground = (req, res, next) =>{

    const {error} = playgroundSchema.validate(req.body);
    
    if(error){
        const msg = error.details.map(el=> el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }
}



app.get('/', (req, res) => {
    res.render('home')
});

// Playground list
app.get('/playgrounds', catchAsync(async (req, res) => {
    const playgrounds = await Playground.find({});
    
    res.render('playgrounds/index', { playgrounds })
}))

// New Playground
app.get('/playgrounds/new', (req, res) => {
    res.render('playgrounds/new');
})




// Add new Playground api
app.post('/playgrounds', validatePlayground, catchAsync(async (req, res, next) => {
    
 
    if(!req.body.playground) throw new ExpressError('Invalid Playground Data',400);
    const playground = new Playground(req.body.playground);
    await playground.save();
    res.redirect(`/playgrounds/${playground._id}`);

}))

// Show single Playground

app.get('/playgrounds/:id', catchAsync(async (req, res, next) => {
    const playground = await Playground.findById(req.params.id).populate('reviews');
    console.log(playground);
    res.render('playgrounds/show', { playground });
}));

// Show edit single Playground
app.get('/playgrounds/:id/edit', catchAsync(async (req, res) => {
    const playground = await Playground.findById(req.params.id)
    
    res.render('playgrounds/edit', { playground });
}))
// Edit single Playground
app.put('/playgrounds/:id', validatePlayground,catchAsync(async (req, res) => {
    const { id } = req.params;
    const playground = await Playground.findByIdAndUpdate(id, { ...req.body.playground });
    
    res.redirect(`/playgrounds/${playground._id}`)
}))

app.delete('/playgrounds/:id', catchAsync( async (req, res) => {
    const { id } = req.params;
    await Playground.findByIdAndDelete(id);
    res.redirect('/playgrounds');
}))

// Review 

app.post('/playgrounds/:id/reviews', validateReview,catchAsync(async(req, res)=>{
    const playground = await Playground.findById(req.params.id);
    const review = new Review(req.body.review);
   

    playground.reviews.push(review);
    await review.save();
    await playground.save();
    res.redirect(`/playgrounds/${playground._id}`);
}))

// delete review
app.delete('/playgrounds/:id/reviews/:reviewId',catchAsync(async(req, res)=>{
    const{id , reviewId} = req.params;
    Playground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(req.params.reviewId);
    res.redirect(`/playgrounds/${id}`);
}))

//
app.all('*',(req, res, next)=>{
    next(new ExpressError('Page Not Found!!!', 404));
})

// error handler 
app.use((err, req, res, next)=>{
   
    const{statusCode=500, message='Something went wrong'} = err;
    console.log(`----------${err.message}`);
    res.status(statusCode).render('error',{err});
    
})

app.listen(3000,()=>{
    console.log('Serving on port 3000')
})