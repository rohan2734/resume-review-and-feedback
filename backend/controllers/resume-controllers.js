//models
const Resume = require("../models/resume");
const User = require("../models/user");


const jwt = require("jsonwebtoken");
const keys = require("../keys/keys");

const createResume = async (req,res) => {
    const {resumeName,user} = req.body;

    // var existingUser ;

    // try{
    //     existingUser = await User.findOne({_id: user._id})
    // }catch(err){
    //     console.log(err);
    // }
    
    
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

    return res.json({status:200,message:"resume is created succesfully",newResume})
    // return res.json({existingUser})

}

exports.createResume = createResume;