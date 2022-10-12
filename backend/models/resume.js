const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    resumeName : {type:String,required:true},
    //candidate details
    //person details
    candidateFullName : {type:String,required:false},
    candidatePhoneNumber:{type:String,required:false},
    candidateAddress: {type:String,required:false},
    candidateGender:{type:String,required:false},
    //social links
    candidateLinkedinURL : {type:String,required:false},
    candidateGithubURL : {type:String,required:false},
    candidateMediumURL : {type:String,required:false},
    candidateWebsiteURL: {type:String,required:false},

    //profile details
    candidateProfileDescription: {type:String,required:false},
    //embedded objects
    // professionalExperience : 
    // skills : 
    // projects:
    // certificates:
    // awards:
    // education:
})

module.exports = mongoose.model('resume',resumeSchema);