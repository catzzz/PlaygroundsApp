const Playground = require('../models/playground');
const { cloudinary } = require("../cloudinary");
//  Mapbox 
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });


module.exports.index = async (req, res) => {
    let page = 1;
    // if no guery. it's the first time to load page
    if(req.query.page){
        page = req.query.page
    }
    
    // Get total length for pagenation
    const totalLength = await (await Playground.find({})).length;
    
    const limit = 8;
    // Skip pages
    let skipPage = (page - 1) * limit;

    // query back to head if over length
    if (page > Math.ceil(totalLength/limit)) {
        skipPage = 0 ;
        page = 1;
    }

    const playgrounds = await Playground.find({}).skip(skipPage).limit(limit).populate('author');
    
    res.render('playgrounds/index', { playgrounds, page ,totalLength, limit })
}





module.exports.renderNewPlaygroundPage = (req, res) => {
    res.render('playgrounds/new');
}

module.exports.createPlayground= async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.playground.location,
        limit: 1
    }).send()

    const playground = new Playground(req.body.playground);
    playground.geometry = geoData.body.features[0].geometry;
    playground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    playground.author = req.user._id;
    await playground.save();

    req.flash('success', 'Successfully made a new playground!');
    res.redirect(`/playgrounds/${playground._id}`)

}

module.exports.showPlayground = async (req, res, next) => {
    const playground = await Playground.findById(req.params.id).populate({
        // populate again with author inside reviews
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');

    if (!playground) {
        req.flash('error', 'Cannot find that playground!');
        return res.redirect('/playgrounds');
    }
    res.render('playgrounds/show', { playground });
};


module.exports.renderEditPlaygroundPage = async (req, res) => {
    const playground = await Playground.findById(req.params.id)
    if (!playground) {
        req.flash('error', 'Cannot find that playground!');
        return res.redirect('/playgrounds');
    }
    res.render('playgrounds/edit', { playground });
}

module.exports.updatePlayground = async (req, res) => {
    const { id } = req.params;
    const playground = await Playground.findByIdAndUpdate(id, { ...req.body.playground });
    const imgs = req.files.map(f =>({url:f.path, filename:f.filename}))
    playground.images.push(...imgs);
    await playground.save();
    // delete images
    if (req.body.deleteImages) {
        // delete image from cloudinary
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await playground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated playground!');
    res.redirect(`/playgrounds/${playground._id}`)
}

module.exports.deletePlayground = async (req, res) => {
    const { id } = req.params;
    await Playground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted playground')
    res.redirect('/playgrounds');
}