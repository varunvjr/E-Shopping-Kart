import express from 'express';
import {getProductById,getProducts,deleteProductById} from "../controllers/productController.js"
import {protect,admin} from "../middleware/authMiddleware.js"
const router=express.Router();
router.get("/",getProducts);
router.get("/:id",getProductById);
router.delete("/:id",protect,admin,deleteProductById);
export default router;