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

export const deleteProductById=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product){
        await product.remove();
        res.json({
            message:"Product has been removed successfully"
        })
    }else{
        res.status(401);
        throw new Error("Product not found")
    }
})

export const createProduct=asyncHandler(async(req,res)=>{
    const product=new Product({
        name:'Sample name',
        price:200,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'Sample brand',
        category:'Sample Category',
        stock:'0',
        reviews:0,
        rating:4.5,
        description:'Sample Description'
    })
    const createdProduct=await product.save();
    res.status(201).json(createdProduct);
})

export const updateProduct=asyncHandler(async(req,res)=>{
    const {
        name,
        price,
        user,
        image,
        brand,
        category,
        stock,
        reviews,
        description
    }=req.body;
    const product=await Product.findById(req.params.id);
    if(product){
        product.name=name,
        product.price=price,
        product.user=user,
        product.image=image,
        product.brand=brand,
        product.category=category,
        product.stock=stock,
        product.reviews=reviews,
        product.description=description
        const updatedProduct=await product.save();
        res.status(201).json(updatedProduct);
    }else{
        res.status(401);
        throw new Error("Product not found")
    }
  

})