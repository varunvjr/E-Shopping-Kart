import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler'

export const getProducts=asyncHandler(async(req,res)=>{
    const products=await Product.find({});
    return res.status(200).json(products);
});

export const getProductById=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product){
        return res.status(200).json(product);
    }else{
        res.status(400)
        throw new Error("Product not found");
    }
  
});


