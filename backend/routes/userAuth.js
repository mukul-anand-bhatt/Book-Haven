const jwt = require("jsonwebtoken");
const authenticateToken = (req,res,next)=>{
    const authHeader =req.headers.authorization;
    const token = authHeader &&  authHeader.split(" ")[1];
    //
    if(token == null){
        return res.status(401).json({message:"Unauthorized"});
    }
    jwt.verify(token,"bookstore123",(err,user)=>{
        if(err){
            return res.status(403).json({message:err.message});
        }
        req.user = user;
        next();
    });
};

module.exports={authenticateToken};