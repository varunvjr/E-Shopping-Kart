import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
export const protect=asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
        try{
            token=req.headers.authorization.split(" ")[1];
            console.log("Token",token);
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            const user=await User.findById(decode.id).select('-password');
            req.user=user;
            
            next();
        }catch(err){
            res.status(401);
            throw new Error("Not Authorized no token");
        }
    }
    if(!token){
        res.status(401);
        throw new Error("Not Authorized no token");
    }
});