import  {userAuth,getUserProfile,registerUser,updateUserProfile} from "../controllers/userController.js";
import express from "express";
const router=express.Router();
import {protect} from "../middleware/authMiddleware.js"

router.post("/",registerUser);
router.post("/login",userAuth);
router.get("/profile",protect,getUserProfile)
router.put("/profile",protect,updateUserProfile)


export default router;