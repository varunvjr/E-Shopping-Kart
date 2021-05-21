import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";
import {generateToken}  from "../utils/generateToken.js"


//@desc Auth user and get Token
//@route POST/api/users/login
//@access Public

export const userAuth=asyncHandler( async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(user&&(await user.matchPassword(password))){
        res.json({
            name:user.name,
            id:user._id,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error("User not found");
    }
});

//@desc Get user Profile
//@route POST/api/users/profile
//@access Private

export const getUserProfile=asyncHandler(async(req,res)=>{
    const user= req.user;
    if(user){
        res.json({
            "id":user._id,
           "user":user.name,
            "email":user.email,
            "isAdmin":user.isAdmin,
           "token":generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error("Invalid email or password");
    }
})
