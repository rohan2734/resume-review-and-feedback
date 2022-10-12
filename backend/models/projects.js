const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema({
    projectTitle : {type:String,required:true},
    projectDescription:  {type:String,required:true},
    projectStartDate :  {type:String,required:true},
    projectEndDate : {type:String,required:true}
})

module.exports = mongoose.model('project',projectsSchema);