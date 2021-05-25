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


//@desc Register a new user
//@route POST/api/users
//@access Public

export const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
   const userExist=await User.findOne({email});
   if(userExist){
      res.status(400)
      throw new Error("User already exists")
   }
   const user=new User({
       name,
       email,
       password
   })
   await user.save();
   if(user){
       res.status(201)
       res.json({
        name:user.name,
        id:user._id,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)
    })
   }else{
       res.status(400)
       throw new Error("Invalid usere data")
   }
})

//@desc Get user Profile
//@route POST/api/users/profile
//@access Private

export const getUserProfile=asyncHandler(async(req,res)=>{
    const user= req.user;
    if(user){
        res.json({
            name:user.name,
            id:user._id,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error("Invalid email or password");
    }
})
