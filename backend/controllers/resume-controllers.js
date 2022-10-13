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
        resumes =  await User.find({user : user._id})
    }catch(err){
        console.log(err);
    }

    return res.json({status:200,message:"resumes fetched succesfully",resumes})
       
}


exports.createResume = createResume;
exports.getResumes = getResumes;