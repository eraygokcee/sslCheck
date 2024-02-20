const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.cookies.token){
        token = req.cookies.token;
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,decoced)=>{
            if(err){
                res.status(401);
                throw new Error("User is not Authorizated.")
            }
            req.user = decoced.user;
            next();
        });
    }
    if(!token){
        res.status(401);
        throw new Error("Token yok kral");
    }
});

module.exports = validateToken;