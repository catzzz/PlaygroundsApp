
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Playground = require('./models/playground');
const ejsMate = require('ejs-mate');

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


app.get('/', (req, res) => {
    res.render('home')
});

// Playground list
app.get('/playgrounds', async (req, res) => {
    const playgrounds = await Playground.find({});
    
    res.render('playgrounds/index', { playgrounds })
});

// New Playground
app.get('/playgrounds/new', (req, res) => {
    res.render('playgrounds/new');
})

// Add new Playground api
app.post('/playgrounds', async (req, res) => {
    const playground = new Playground(req.body.playground);
    await playground.save();
    res.redirect(`/playgrounds/${playground._id}`)
})

// Show single Playground

app.get('/playgrounds/:id', async (req, res,) => {
    const playground = await Playground.findById(req.params.id)
    res.render('playgrounds/show', { playground });
});

// Show edit single Playground
app.get('/playgrounds/:id/edit', async (req, res) => {
    const playground = await Playground.findById(req.params.id)
    res.render('playgrounds/edit', { playground });
})
// Edit single Playground
app.put('/playgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const playground = await Playground.findByIdAndUpdate(id, { ...req.body.playground });
    res.redirect(`/playgrounds/${playground._id}`)
});

app.delete('/playgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/playgrounds');
})
app.listen(3000,()=>{
    console.log('Serving on port 3000')
})