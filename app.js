
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Playground = require('./models/playground');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const ejsMate = require('ejs-mate');
const Joi = require('joi');
const{playgroundSchema,reviewSchema} = require('./schemas');
const Review = require('./models/review');


const playgrounds = require('./routes/playgrounds');
const reviews = require('./routes/reviews');


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

// routes
app.use('/playgrounds', playgrounds);
app.use('/playgrounds/:id/reviews', reviews);



app.get('/', (req, res) => {
    res.render('home')
});




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