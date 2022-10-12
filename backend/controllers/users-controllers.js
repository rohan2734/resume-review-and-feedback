const User = require("../models/user");

//third party packages for functionality
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//keys
const {JWT_KEY} = require("../keys/keys");

const validateEmail = (emailID) =>{
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    return regex.test(emailID)
}

const signupUser =  async (req,res,next) => {

    var {emailID,password,confirmPassword,role} = req.body;

    console.log({reqBody: req.body});

    if(!(emailID && password && confirmPassword && role!=null )){  
       
        return res.json({status:400,message:"All fields are required"})
    }

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
    if(role == 1){
        if(req.body.linkedinURL==null){
            return res.json({status:400,message:"all fields are required"})
        }
        createdUser = {...createdUser,linkedinURL:req.body.linkedinURL}
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

const loginUser = async (req,res,next)=>{
   const {emailID,password} = req.body;

   if(!(emailID && password)){
    return res.json({status:400,message:"All fields are required"}) 
   }

   let existingUser;
   try{
    existingUser = await User.findOne({emailID});
    if(!existingUser){
        return res.json({status:400,message:"user not found"});
    }

   }catch(err){
    console.log(err);
   }

   if(existingUser.role == 1){
      let currWaitingForApprovalStatus = existingUser.waitingForApproval;
     if(currWaitingForApprovalStatus == 0){
        return res.json({status:400,message:"waiting for approval"})
     }else if(currWaitingForApprovalStatus == -1){
        return res.json({status:400,message:"rejected as expert"})
     }
   }

//    console.log({existingUser});
   var token;
   try{
    let result = await bcrypt.compare(password,existingUser.password);
    // console.log({result});
    if(result){
         token = await jwt.sign({exp: Math.floor(Date.now()/1000 + 60*60), data:existingUser,},JWT_KEY);
    }else{
        return res.json({status:400,message:"user credentials doesnt match, try again"})
    }

   }catch(err){
    console.log(err);
   }

   return res.json({status:200,message:"authentication successful",token})
   
}
exports.loginUser =loginUser;
exports.signupUser  = signupUser;