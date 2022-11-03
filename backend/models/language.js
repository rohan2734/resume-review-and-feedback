const mongoose = require("mongoose");

const languagesSchema = new mongoose.Schema({
    languageTitle : {type:String,required:true},
    languageLevel :  {type:String,required:true},
   
})

module.exports = mongoose.model('Language',languagesSchema);