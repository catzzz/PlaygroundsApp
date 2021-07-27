
const User = require('../models/user');


module.exports.index = (req, res) => {
    res.render('profile/index');
} 

module.exports.updateProfile = async (req, res) => {
    // const { currentUser } = req.user
    // console.log(currentUser)
    res.send('Action edit profile')
}