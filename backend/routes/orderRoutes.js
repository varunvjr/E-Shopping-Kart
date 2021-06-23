import {addOrderItems,getOrderById,updateOrderToPaid,getMyOrders,getOrders} from "../controllers/orderController.js"
import express from 'express';
import {admin, protect} from "../middleware/authMiddleware.js"
const router=express.Router();


router.get("/",protect,admin,getOrders);
router.post("/",protect,addOrderItems);
router.get("/myorders",protect,getMyOrders);
router.get("/:id",protect,getOrderById);

router.put("/:id/pay",protect,updateOrderToPaid);
export default router;