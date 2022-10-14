const jwt  = require("jsonwebtoken");
const { JWT_KEY } = require("../keys/keys");

const authenticateToken =  async (req,res,next) => {
    
    const authHeader = req.headers['authorization']
    // console.log({authHeader});
    var token = authHeader && authHeader.split(' ')[1]

    // console.log({token8: token});

    if(token == null){
        return res.json({status:400,message:"token not found"})
    }


    // console.log({token});
    
    let decodedData;
    try{
        decodedData =  await jwt.verify(token,JWT_KEY)
    }catch(err){
        console.log(err);
    }
    // console.log({data});
    if(decodedData){
        req.body.user = decodedData.data;
    }

    next()
  
}



exports.authenticateToken = authenticateToken