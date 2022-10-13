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
    professionalExperiences : [{type: mongoose.Schema.Types.ObjectId,ref:'ProfessionalExperience'}],
    skills : [{type: mongoose.Schema.Types.ObjectId,ref:'Skill'}],
    projects: [{type: mongoose.Schema.Types.ObjectId,ref:'Project'}],
    certificates: [{type: mongoose.Schema.Types.ObjectId,ref:'Certificate'}],
    awards: [{type: mongoose.Schema.Types.ObjectId,ref:'Award'}],
    education: {type: mongoose.Schema.Types.ObjectId,ref:'Education'},

    //belongs to user
    user: {type:mongoose.Schema.Types.ObjectId,ref:'User'}
})

module.exports = mongoose.model('Resume',resumeSchema);