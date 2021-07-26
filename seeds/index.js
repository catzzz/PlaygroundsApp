const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Playground = require('../models/playground');

mongoose.connect('mongodb://localhost:27017/my-playgrounds', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Playground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const likes =Math.floor(Math.random() * 100);
        
        const play = new Playground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            likes:`${likes}`,
            author:'60fb4bd233277724e1390d76',
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude, 
                    cities[random1000].latitude
                ]
            },
            images:[
                {   
                    
                    url: 'https://res.cloudinary.com/dxspz43sd/image/upload/v1627270884/Bee-playgrounds/gw5mdnvu4rkkviz1apwc.jpg',
                    filename: 'Bee-playgrounds/gw5mdnvu4rkkviz1apwc'
                },
                {   
                   
                    url: 'https://res.cloudinary.com/dxspz43sd/image/upload/v1627270884/Bee-playgrounds/fj426uagokihhdxzzkcs.jpg',
                    filename: 'Bee-playgrounds/fj426uagokihhdxzzkcs'
                },
                {   
                   
                    url: 'https://res.cloudinary.com/dxspz43sd/image/upload/v1627270884/Bee-playgrounds/kv0tfcjkwjklmaiuka6e.jpg',
                    filename: 'Bee-playgrounds/kv0tfcjkwjklmaiuka6e'
                },

            ],
            description:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.3',
            
        })

        await play.save();
    }
    
}

seedDB().then(() => {
    mongoose.connection.close();
})