const mongoose = require('mongoose');
const Review = require('./review');

const Schema = mongoose.Schema;

const PlaygroundSchema = new Schema({
    title: String,
    likes: String,
    image: String,
    description: String,
    location: String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});


PlaygroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})


module.exports = mongoose.model('Playground', PlaygroundSchema);
