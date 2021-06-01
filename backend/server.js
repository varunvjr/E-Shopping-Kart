import express from 'express'
import colors from 'colors';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import {notFound,errorHandler} from "./middleware/errorMiddleware.js";
dotenv.config();



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
app.use(notFound);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} on port:${PORT}`.yellow.bold);
})