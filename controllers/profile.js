const User = require("../models/user");

const { cloudinary } = require("../cloudinary");

module.exports.index = (req, res) => {
  res.render("profile/index");
};

module.exports.updateProfile = async (req, res, next) => {
 
  const user = await User.findById(req.user._id);
  if (!user) {
    req.flash("error", "No account found");
    return res.redirect("/playgrounds");
  }

  const {email, username} = req.body.profile

  //     // validate
  if (!email || !username) {
    // simplified: '' is a falsey
    req.flash("error", "One or more fields are empty");
    return res.redirect("/profile"); // modified
  }
  user.email = email;
  user.username = username;

  // get old image
  if (user.images && req.file) {
    const oldfilename = user.images.filename;
    // delete old image from cloudinary
    await cloudinary.uploader.destroy(oldfilename);
    req.flash("success", "updated profile");
  }
  if(req.file){
    user.images = ({url:req.file.path, filename:req.file.filename});
  }

  await user.save();
  res.redirect('/playgrounds');
};

