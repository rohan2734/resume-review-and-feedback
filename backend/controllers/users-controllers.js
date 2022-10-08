const User = require("../models/user");

//third party packages for functionality
const bcrypt = require("bcryptjs");

const validateEmail = (emailID) =>{
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    return regex.test(emailID)
}

const createUser =  async (req,res,next) => {

    var {emailID,password,confirmPassword,role} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({emailID});

        if(existingUser){
           return res.json({status:400,message:"user already exists",existingUser})
        }
    }catch(err){
        console.log(err);
    }


  
    var createdUser = {
        emailID,
        password,
        confirmPassword,
        role
    }

    if(!validateEmail(emailID)){
        return res.json({status:"400",message:"email is not valid"})
    }

    if(password!=confirmPassword){
        return res.json({status:"400",message:"password and confirmpassword are not same",password,confirmPassword})
    }


    var hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password,10);
        createdUser.password = hashedPassword;
        // console.log({hashedPassword});
        createdUser.confirmPassword = hashedPassword
        // console.log({createdUserHashed: createdUser});
    }catch(err){
        console.log(err);
    }
    if(role == 1){
        // createdUser = {...createdUser,waitingForApproval:0}
        createdUser.waitingForAprroval = 0;
    }
    console.log({createdUserBeforeSaving:createdUser});
    var savedUser = new User(createdUser);
    try{
        savedUser =  await savedUser.save();
    }catch(err){
        console.log(err);
    }

    return res.json({status:200,message:"user created successfully",savedUser});

}

exports.createUser  = createUser;