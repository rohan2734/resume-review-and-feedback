const User = require("../models/user");

const createUser =  async (req,res,next) => {

    const {emailID,password,confirmPassword,role} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({emailID});

        if(existingUser){
           return res.json({status:400,message:"user already exists",existingUser})
        }
    }catch(err){
        console.log(err);
    }


  
    const createdUser = {
        emailID,
        password,
        confirmPassword,
        role
    }

    if(role == 1){
        createdUser = {...createdUser,waitingForApproval:0}
    }

    let savedUser = new User(createdUser);
    try{
        savedUser =  await savedUser.save();
    }catch(err){
        console.log(err);
    }

    return res.json({status:200,message:"user created successfully",savedUser});

}

exports.createUser  = createUser;