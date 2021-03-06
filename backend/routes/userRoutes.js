import  {userAuth,getUserProfile,registerUser,updateUserProfile,getAllUsers,deleteUser,getUserById,updateUserById} from "../controllers/userController.js";
import express from "express";
const router=express.Router();
import {protect,admin} from "../middleware/authMiddleware.js"

router.get("/",protect,admin,getAllUsers);
router.get("/profile",protect,getUserProfile);
router.get("/:id",protect,admin,getUserById);
router.post("/",registerUser);
router.delete("/:id",protect,admin,deleteUser);
router.post("/login",userAuth);

router.put("/profile",protect,updateUserProfile)
router.put("/:id",protect,admin,updateUserById);

export default router;