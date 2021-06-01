import {addOrderItems} from "../controllers/orderController.js"
import express from 'express';
import {protect} from "../middleware/authMiddleware.js"
const router=express.Router();

router.post("/",protect,addOrderItems);


export default router;