import express from 'express'
import colors from 'colors';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import {notFound,errorHandler} from "./middleware/errorMiddleware.js";
dotenv.config();



const app=express();

const PORT=process.env.PORT;
connectDB();
import cors from "cors";
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Backend")
})
app.use("/api/products",productRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} on port:${PORT}`.yellow.bold);
})