const jwt = require('jsonwebtoken')     


const authMiddleware = async (req,res,next)=>{
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){return res.status(401).json({message : "No auth token found"})}

    try{
        //verifying the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(token)
        req.user = decoded;  //adding the decoded id to the req object as a key value pair where user is the key and decoded is the value
        console.log(req.user)
        next();
    }catch(err){
        res.status(401).json({message : 'Invalid/expired token'})
    }
}

module.exports = authMiddleware;