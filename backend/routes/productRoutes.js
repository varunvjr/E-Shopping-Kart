import express from 'express';
import {getProductById,getProducts,deleteProductById,updateProduct,createProduct} from "../controllers/productController.js"
import {protect,admin} from "../middleware/authMiddleware.js"
const router=express.Router();
router.get("/",getProducts);
router.post("/",protect,admin,createProduct);
router.get("/:id",getProductById);
router.put("/:id",protect,admin,updateProduct);
router.delete("/:id",protect,admin,deleteProductById);
export default router;