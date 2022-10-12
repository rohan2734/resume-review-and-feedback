const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
    skillName : {type:String,required:true},
    skillLevel : {type:String,required:true}
})

module.exports = mongoose.model('skill',skillsSchema);