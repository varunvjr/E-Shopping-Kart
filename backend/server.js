import express from 'express'
import colors from 'colors';

import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import {notFound,errorHandler} from "./middleware/errorMiddleware.js";
dotenv.config();
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { uuid } from 'uuidv4';
const app=express();
app.use(express.json());
const PORT=process.env.PORT;
connectDB();
import cors from "cors";
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Backend")
})

app.use("/api/products",productRouter);
app.use("/api/users",userRouter);
app.use("/api/orders",orderRouter);
app.get("/api/config/stripe",(req,res)=>{res.status(200).json({
    clientId:process.env.STRIPE_CLIENT_ID
})})
app.post("/api/config/checkout",async(req,res)=>{
    console.log(res.body);
    try{
        const {product,token}=req.body;
      const customer= await stripe.customers.create({
            email:token.email,
            source:token.id
        });
        const idempotency_key=uuid();
        const charge=await stripe.charges.create({
            amount:product.price*100,
            currency:"USD",
            customer:customer.id,
            receipt_mail:token.email,
            description:'Purchased the',
            shipping:{
                name:token.card.name,
                address:{
                    line1:token.card.address_line1,
                    line2:token.card.address_line2,
                    city:token.card.address_city,
                    country:token.card.address_country,
                    postal_code:token.card.address_zip
                }
            }

        },{
            idempotency_key
        })
        status="success"
    }catch(error){
        status="failure"
        throw new Error("Payment corrupt")
    }
})
app.use(notFound);
app.use(errorHandler);


app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} on port:${PORT}`.yellow.bold);
})