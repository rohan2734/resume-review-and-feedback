const Resume = require("../models/resume");

const createResume = async (req,res) => {
    const {resumeName} = req.body;

    if(!resumeName){
        return res.json({status:400,message:"resume name is required"})
    }
    var newResume = new Resume({
        resumeName
    })

    try{
        newResume =  await newResume.save();
    }catch(err){
        console.log(err);
    }

    return res.json({status:200,message:"resume is created succesfully",newResume})


}

exports.createResume = createResume;