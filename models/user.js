const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema ({
    email:{
        type:String,
        required:true,
        unique:true
    }
});
// Include username and passwords ,and salts
// authenticate is generated in passport localStorage
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);