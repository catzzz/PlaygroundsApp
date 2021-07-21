const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaygroundSchema = new Schema({
    title: String,
    rates: String,
    image: String,
    description: String,
    location: String
});

module.exports = mongoose.model('Playground', PlaygroundSchema);
