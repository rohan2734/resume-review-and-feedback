const jwt  = require("jsonwebtoken");
const { JWT_KEY } = require("../keys/keys");

const authenticateToken =  async (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = (authHeader && authHeader.split(' ')[1]).slice(1,-1)

    // console.log({token});
    if(token == null){
        return res.json({status:400,message:"token not found"})
    }
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