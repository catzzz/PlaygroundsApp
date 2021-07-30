const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:'User',
    },
    token:{
        type:String,
        require:true,
    },
    createAt:{
        type:Date,
        default:Date.now,
        expires:3600,
    }

})

module.exports = mongoose.model("Token", tokenSchema);