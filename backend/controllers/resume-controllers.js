//models
const Resume = require("../models/resume");
const User = require("../models/user");

//3rd party modules
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload")
const formidable = require("formidable");

//constants
const keys = require("../keys/keys");


const createResume = async (req,res) => {
    const {resumeName,user} = req.body;

    // var existingUser ;

    // try{
    //     existingUser = await User.findOne({_id: user._id})
    // }catch(err){
    //     console.log(err);
    // }
    
    // console.log({user});
    if(!user){
        return res.json({status:400,message:"jwt decryption failed"})
    }
    
    if(!resumeName){
        return res.json({status:400,message:"resume name is required"})
    }
    var newResume = new Resume({
        resumeName,
        user:user._id
    })

    try{
        newResume =  await newResume.save();
    }catch(err){
        console.log(err);
    }
    // console.log({newResume});
    return res.json({status:200,message:"resume is created succesfully",newResume})
    // return res.json({existingUser})

}

const getResumes =  async (req,res) => {
    // const userID = req.body.user._id;
    var user = req.body.user;
    // console.log({user});

    if(!user){
        return res.json({status:400,message: "user is undefined"})
    }
    var resumes ;
    
    try{
        resumes =  await Resume.find({user : user._id})
    }catch(err){
        console.log(err);
    }

    return res.json({status:200,message:"resumes fetched succesfully",resumes})
       
}

const getResumeById = async (req,res ) =>{
    const {resumeId} = req.params;

    var resume;
    try{
        resume = await Resume.findOne({_id:resumeId}) 
    }catch(err){
        console.log(err);
    }

    if(resume == null){
        return res.json({status:400,message:"resume not found"})
    }

    return res.json({status:200,resume})
} 

const editResumeByIdPerson =  async (req,res)=>{
    
    const profilePic = req.file;
    console.log({profilePic});

    // const {resumeId} = req.body;
    // console.log({resumeId});
//     const form = new formidable.IncomingForm();

//     var fields;
//     var files;

//     const ns ={
//         form_parse: async (req,form) => await new Promise((resolve,reject) => form.parse(req, (err,fields,files) => err ? reject(err) : resolve([fields,files])))
//     }

//     try{
//         [fields,files] = await ns.form_parse(req,form)
//     }catch(err){
//         console.log(err);
//     }
//    console.log({fields,files});
   
//     const {profilePic } = files;


    if(!profilePic){
        return res.json({status:400,message:"profile pic is required"})
    }

    const {resumeId,resumeName,fullName,address,gender,emailID,phoneNumber} = req.body;

    if(! (resumeId && resumeName &&fullName && address && gender && emailID && phoneNumber!=null ) ){
        return res.json({status:400,message:"all fields are required"})
    }
    var uploadedProfilePic;
//     console.log({profilePic});
    // cloudinary.uploader.upload(profilePic.path)
    // .then( result => {
    //     uploadedProfilePic = result;
    //     console.log({pic127:uploadedProfilePic});
    // })
    // .catch(err => {
    //     console.log(err);
    // })
    try{
        uploadedProfilePic = await cloudinary.uploader.upload(profilePic.path)
        
    }catch(err){
        console.log(err);
    }

    var existingResume ;
    try{
        existingResume = await Resume.find({_id:resumeId});
    }catch(err){
        console.log(err);
    }

    if((!existingResume)){
        return res.json({status:400,message:"resume not found"})
    }
    var linkedinURL;
    var githubURL;
    var mediumURL;
    var websiteURL;
    var jobTitle;

    if(req.body.linkedinURL!=null){
        linkedinURL = req.body.linkedinURL
        existingResume = {...existingResume,linkedinURL}
    }
    if(req.body.githubURL!=null){
        githubURL = req.body.githubURL;
        existingResume = {...existingResume,githubURL}
    }

    if(req.body.mediumURL!=null){
        mediumURL = req.body.mediumURL;
        existingResume = {...existingResume,mediumURL}
    }
     if(req.body.websiteURL!=null){
        websiteURL = req.body.websiteURL;
        existingResume = {...existingResume,websiteURL}
    }
    if(req.body.jobTitle!=null){
        jobTitle = req.body.jobTitle;
        existingResume={...existingResume,jobTitle}
    }
    // console.log({picLink : uploadedProfilePic});
    existingResume = {
        ...existingResume,
        resumeName,
        fullName,
        address,
        gender: gender.toUpperCase(),
        emailID,
        phoneNumber,
        address,
        profilePicURL:uploadedProfilePic.url
    }
    var updatedResume;
    try{
        const filter = {_id: resumeId};
        
        updatedResume = await Resume.findByIdAndUpdate(filter,existingResume,{
            new:true
        })
    }catch(err){
        console.log(err);
    }

    console.log({updatedResume});

    return res.json({status:200,message:"updated the resume succesfully",updatedResume})
    // return res.json({fields,files})
    // return res.json({profilePicURL})
    // return res.json({message:"hi"})
    // return res.json({profilePic,profilePicURL})

}
exports.createResume = createResume;
exports.getResumes = getResumes;
exports.getResumeById = getResumeById;
exports.editResumeByIdPerson = editResumeByIdPerson;