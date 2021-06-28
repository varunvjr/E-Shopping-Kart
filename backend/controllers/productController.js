import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler'

export const getProducts=asyncHandler(async(req,res)=>{
    const pageSize=2;
    const page=Number(req.query.pageNumber)||1;



    const keyword=req.query.keyword?{
        name:{
            $regex:req.query.keyword,
            $options:'i'
        }
    }:{}
    const count=await Product.countDocuments({...keyword});
    const products=await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1));
    return res.status(200).json({products,page,pages:Math.ceil(count/pageSize)});
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

//@desc Create user review
//@route POST/api/products/:id/reviews
//@access Private
export const createProductReview=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    const {rating,comment}=req.body;
    if(product){
        const alreadyReviewed=product.totalreviews.find(p=>p.user.toString()==req.user._id.toString())
        if(alreadyReviewed){
            throw new Error("Product has been already reviewed by existing user")
        }else{
            const newReview={
                name:req.user.name,
                rating:Number(rating),
                comment,
                user:req.user._id
            }
            product.totalreviews.push(newReview);
            product.reviews=product.totalreviews.length;
            product.rating=product.totalreviews.reduce((acc,item)=>acc+item.rating,0)/product.reviews;
            await product.save();
            res.status(200).json({message:"Review Added "});
        }
    }else{
        throw new Error("Product Not found")
    }
});

//@desc Create user review
//@route POST/api/products/top
//@access Public

export const getTopProducts=asyncHandler(async(req,res)=>{
    const products=await Product.find({}).sort({rating:-1}).limit(3);
    res.status(200).json(products);
})