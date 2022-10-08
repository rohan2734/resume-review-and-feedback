const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    emailID : { type : String , required : true},
    password : {type:String,required:true},
    confirmPassword:{type:String,required:false},
    role : {type:Number,required:false},
    waitingForApproval : {type: Number,required:false}
})
//role -0 =>student
//role -1 =>expert

//for experts
//waitingForApproval 
// 0- waiting for approval
// -1 - rejected
// 1 - approved 

module.exports  = mongoose.model('User',userSchema);
// first argument in model method is the collection name

