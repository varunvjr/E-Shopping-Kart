import  {userAuth,getUserProfile,registerUser} from "../controllers/userController.js";
import express from "express";
const router=express.Router();
import {protect} from "../middleware/authMiddleware.js"

router.post("/",registerUser);
router.get("/profile",protect,getUserProfile)
router.post("/login",userAuth);

export default router;