const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
    educationDegree : {type:String, required:true},
    educationSchool : {type:String, required:true},
    educationLocation: {type:String, required:true},
    educationDescription: {type:String, required:true},
    educationStartDate : {type:String, required:true},
    educationEndDate : {type:String, required:true}
})

module.exports = mongoose.model('Education',educationSchema);
