const mongoose = require("mongoose");

const awardsSchema = new mongoose.Schema({
    awardTitle :  {type:String,required:true},
    awardIssuer :  {type:String,required:true},
    awardStartDate :  {type:String,required:true},
    awardEndDate :  {type:String,required:true},
    awardDescription :  {type:String,required:true}
})

module.exports = mongoose.model('Award',awardsSchema);