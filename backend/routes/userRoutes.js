import  {userAuth,getUserProfile,registerUser,updateUserProfile,getAllUsers} from "../controllers/userController.js";
import express from "express";
const router=express.Router();
import {protect,admin} from "../middleware/authMiddleware.js"

router.get("/",protect,admin,getAllUsers);
router.post("/",registerUser);
router.post("/login",userAuth);
router.get("/profile",protect,getUserProfile)
router.put("/profile",protect,updateUserProfile)


export default router;