const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaygroundSchema = new Schema({
    title: String,
    likes: String,
    image: String,
    description: String,
    location: String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Reviw'
        }
    ]
});

module.exports = mongoose.model('Playground', PlaygroundSchema);
