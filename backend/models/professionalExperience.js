const mongoose = require("mongoose");

const professionalExperienceSchema = new mongoose.Schema({
    peJobTitle : {type:String,required:true},
    peEmployer : {type:String,required:true},
    peDescription : {type:String,required:true},
    peStartDate : {type:String,required:true},
    peEndDate : {type:String,required:false},
    pePresent: {type:Boolean,required:false},
    peLocation: {type:String,required:true}

})

module.exports = mongoose.model('professionalExperience',professionalExperienceSchema);