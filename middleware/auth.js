const jwt = require("jsonwebtoken");

auth = (req,res,next)=>{
    let token =  req.header('Authorization');
    token =  token.slice(7)
    if(!token) res.status(401).send("Access Denied!");
    try{
        const verified =  jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send("Invalid Token");
    }
}
module.exports = { auth };