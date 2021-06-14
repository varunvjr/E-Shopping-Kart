import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";
import {generateToken}  from "../utils/generateToken.js"


//@desc Auth user and get Token
//@route POST/api/users/login
//@access Public

export const userAuth=asyncHandler( async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(user){
        if(!(await user.matchPassword(password))){
            res.status(500)
            throw new Error("Password is incorrect")
        }
        else if(user&&(await user.matchPassword(password))){
            res.json({
                name:user.name,
                id:user._id,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user._id)
            })
        }
    }
    else{
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
//@route GET/api/users/profile
//@access Private

export const getUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findOne(req.user._id);
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

//@desc Update user Profile
//@route PUT/api/users/profile
//@access Private

export const updateUserProfile=asyncHandler(async(req,res)=>{
    const user= await User.findById(req.user._id)
    if(user){
        user.name=req.body.name||user.name;
        user.email=req.body.email||user.email;
        if(req.body.password){
            user.password=req.body.password
        }
       const updatedUser=await user.save();
       res.status(201).json({
           id:updatedUser.id,
           name:updatedUser.name,
           email:updatedUser.email,
           isAdmin:updatedUser.isAdmin,
           token:generateToken(updatedUser.id)

       })
    }else{
        res.status(401)
        throw new Error("Invalid email or password");
    }
})

//@desc GET all users
//@route GET/api/users
//@access Private

export const getAllUsers=asyncHandler(async(req,res)=>{
    const users=await User.find({})
    res.status(200).json(users);
})

export const deleteUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id);
    if(user){
        await user.remove();
        res.json({
            message:"User has been removed successfully"
        })
    }else{
        res.status(401);
        throw new Error("User not found")
    }  
})