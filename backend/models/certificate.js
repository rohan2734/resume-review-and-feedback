const mongoose =require("mongoose");

const certificatesSchema = new mongoose.Schema({
    certificateTitle :  {type:String,required:true},
    certificateDescription :  {type:String,required:true}
})

module.exports = mongoose.model('Certificate',certificatesSchema);